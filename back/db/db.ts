const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

// database connection
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "managemate"
});
//

export const sessionStore = new MySQLStore(
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
