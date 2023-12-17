import express, { Express, Request, Response } from "express";

const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app: Express = express();

// database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "managemate"
});
//

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = new MySQLStore(
  {
    expiration: 10800000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessiontbl",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data"
      }
    }
  },
  db
);

app.use(
  session({
    key: "user_id",
    secret: "thiskeyissecretdonotshowitanyone",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 10800000
    }
  })
);

interface User {
  id: number;
  project_id: number;
  name: string;
  mail: string;
  hash_key: string;
  password: string;
}

app.post("/login", (req: Request, res: Response) => {
  // gettings name and password from frontend
  const { mail, password } = req.body;

  // then get all users
  db.query(
    "SELECT * FROM users WHERE mail = ? AND password = ?",
    [mail, password],
    (error: Error, result: User[]) => {
      if (error) return res.status(500).send(error);

      if (result.length > 0) {
        req.session!.user_key = result[0].hash_key;
        return res.status(200).send("Logged in!");
      }

      return res.status(500).send("User is not found!");
    }
  );
});

app.post("/sing_up", (req: Request, res: Response) => {
  // if this is a new user, insert its inf to database
  db.query("INSERT INTO users SET ?", [req.body], (error: Error) => {
    if (error) return res.status(500).send(error);
  });

  // set its hash_key
  req.session!.user_key = req.body.hash_key;

  // and show text
  return res.status(200).send("Successfully!");
});

// destroy session
app.post("/logout", (req: Request, res: Response) => {
  req.session?.destroy((err) => {
    if (!err) res.send("Logged out!");
  });
});

app.get("/user", (req: Request, res: Response) => {
  db.query(
    "SELECT id, name, mail FROM users WHERE hash_key = ?",
    [req.session?.user_key],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);
      return res.status(200).json(result);
    }
  );
});

app.get("/projects", (req: Request, res: Response) => {
  const { user_id } = req.query;

  db.query(
    "SELECT project_id FROM users_projects WHERE user_id = ?",
    [user_id],
    (error: Error, project_id: any) => {
      if (error) return res.status(500).send("Error, something goes wrong!");

      const buff_indexes: number[] = [];

      JSON.parse(JSON.stringify(project_id)).forEach((idx: any) => {
        buff_indexes.push(idx.project_id);
      });

      db.query(
        `SELECT * FROM projects WHERE id IN (${buff_indexes.join(",")})`,
        (error: Error, projects: any) => {
          if (error) return console.log(error);

          return res.status(200).json(projects);
        }
      );
    }
  );
});

app.post("/new_project", (req: Request, res: Response) => {
  const { title, icon_name, overview, tasks, notes, questions } = req.body;
  const buff_obj = {
    title: title,
    icon_name: icon_name,
    overview: overview,
    tasks: tasks,
    notes: notes,
    questions: questions
  };

  db.query("INSERT INTO projects SET ?", [buff_obj], (error: Error) => {
    if (error) return res.status(500).send("Error, something goes wrong!");

    db.query("SELECT * FROM projects", (error: Error, projects: any) => {
      if (error) return res.status(500).send("Error, something goes wrong!");

      const addedProject = projects[projects.length - 1].id;
      const user_id = req.body.user_added_id;

      const query = `INSERT INTO users_projects (user_id, project_id) VALUES (${user_id}, ${addedProject})`;

      db.query(query, (error: Error) => {
        if (error) console.log(error);
      });
    });

    return res.status(200).send("Succesfully!");
  });
});

// check if user is logged in and has a session
app.get("/session_status", (req: Request, res: Response) => {
  if (req.session?.user_key) {
    // if has show status code and message
    return res.status(200).json({
      status: 200,
      message: "Logged!"
    });
  }
  return res.status(401).json({ status: 401, message: "Log in first!" });
});

app.listen(2000, () => {
  console.log(`Server is running`);
});
