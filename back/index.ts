import express, { Express, Request, Response } from "express";
import session from "express-session";

const app: Express = express();

const mysql = require("mysql");

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "managemate"
});

// middlewares
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "user",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 26280000, secure: true, httpOnly: false }
  })
);

const corsConfig = {
  origin: true,
  credentials: true
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
//

app.get("/projects", (req: Request, res: Response) => {
  db.query("SELECT * FROM projects", (error: Error, result: any) => {
    if (error) return res.status(500).send("Error, something goes wrong!");

    return res.status(200).json(result).end();
  });
});

app.get("/users", (req: Request, res: Response) => {
  db.query("SELECT * FROM users", (error: Error, result: any) => {
    if (error) return res.status(500).send("Error, something goes wrong!");

    return res.status(200).json(result).end();
  });
});

app.get("/members", (req: Request, res: Response) => {
  const { id } = req.query;

  db.query(
    "SELECT * FROM users WHERE projects_id = ?",
    id,
    (error: Error, result: any) => {
      if (error) return res.status(500).send("Error, something goes wrong!");

      return res.status(200).json(result).end();
    }
  );
});

app.post("/sing_up", (req: Request, res: Response) => {
  db.query("INSERT INTO users SET ?", [req.body], (error: Error) => {
    if (error) return res.status(500).send(error);
  });

  res.cookie("cookie-name", "cookie-value", { maxAge: 900000, httpOnly: true });

  // console.log(req.body.hash_key);

  // res.cookie("hash_key", req.body.hash_key);

  // req.session!.user_key = req.body.hash_key;

  // console.log(req.session!.user_key);
  return res.status(200).send("Successfully!");
});

app.listen(2000, () => {
  console.log(`Server is running`);
});
