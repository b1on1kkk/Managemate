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

app.get("/users", (_, res: Response) => {
  db.query("SELECT id, name, mail FROM users", (error: Error, result: any) => {
    if (error) return res.status(500).send(error);
    return res.status(200).json(result);
  });
});

app.get("/projects", (req: Request, res: Response) => {
  const { user_id } = req.query;

  // getting all projects that connects to person.
  db.query(
    "SELECT * FROM projects JOIN users_projects ON projects.id = users_projects.project_id WHERE users_projects.user_id = ?",
    [user_id],
    (error: Error, projects: any) => {
      if (error) return console.log(error);

      return res.status(200).json(projects);
    }
  );
});

app.get("/members", (req: Request, res: Response) => {
  const { user_id } = req.query;

  // getting all users that connects to project.
  db.query(
    "SELECT id, name, mail FROM users JOIN users_projects ON users.id = users_projects.user_id WHERE users_projects.project_id = ?",
    [user_id],
    (error: Error, projects: any) => {
      if (error) return console.log(error);

      return res.status(200).json(projects);
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

    db.query(
      "SELECT * FROM projects ORDER BY id DESC LIMIT 1",
      (error: Error, project: any) => {
        if (error) return res.status(500).send("Error, something goes wrong!");

        const user_id = req.body.user_added_id;
        const query = `INSERT INTO users_projects (user_id, project_id) VALUES (${user_id}, ${project[0].id})`;

        db.query(query, (error: Error) => {
          if (error)
            return res.status(500).send("Error, something goes wrong!");
        });
      }
    );

    return res.status(200).send("Succesfully!");
  });
});

app.post("/collaborate", (req: Request, res: Response) => {
  const { user_id, project_id } = req.body;

  db.query(
    "INSERT INTO `users_projects` (`project_id`, `user_id`) VALUES (?, ?);",
    [project_id, user_id],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);
      return res.status(200).json(result);
    }
  );
});

app.post("/remove_collaborate", (req: Request, res: Response) => {
  const { user_id, project_id } = req.body;

  db.query(
    "DELETE FROM `users_projects` WHERE `users_projects`.`project_id` = ? AND `users_projects`.`user_id` = ?",
    [project_id, user_id],
    (error: Error, result: any) => {
      if (error) return res.status(500).send(error);
      return res.status(200).json(result);
    }
  );
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
