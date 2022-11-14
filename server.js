var mysql = require("mysql");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { sha256 } = require("js-sha256");
const port = 3000;

var tmpData;
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbs_auth",
});

db.connect();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "pages/register.html"));
});

app.get("/profile", (req, res) => {
  if (!tmpData) {
    res.render("error", { ErrorMsg: "Please log in first.", Route: "/" });
  } else {
    res.render("profile", { data: tmpData });
  }
});

app.get("/logout", (req, res) => {
  tmpData = null;
  res.redirect("/");
});

app.post("/registerUser", async (req, res) => {
  let data = {
    Name: req.body.username,
    Password: sha256(req.body.password),
    RawPassword: req.body.password,
    Email: req.body.email,
    Type: req.body.type,
  };
  await db.query(
    `INSERT INTO \`user\` (\`id\`, \`Name\`, \`Email\`, \`Password\`, \`Type\`) VALUES (NULL, '${data.Name}', '${data.Email}', '${data.Password}', '${data.Type}')`,
    function (err, result, fields) {
      if (err) {
        switch (err.code) {
          case "ER_DUP_ENTRY":
            res.render("error", {
              ErrorMsg: "The user with this email/username already exists.",
              Route: "/register",
            });
            return;

          default:
            break;
        }
      }
      tmpData = data;
      res.redirect("/profile");
    }
  );
});

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let pass = req.body.password;
  await db.query(
    `SELECT * FROM \`user\` WHERE \`Email\` = \"${email}\"`,
    function (err, result, fields) {
      if (!result[0]) {
        res.render("error", { ErrorMsg: "Wrong email/password.", Route: "/" });
        return;
      }
      if (sha256(pass) === result[0].Password) {
        result[0].RawPassword = pass;
        if (result) {
          tmpData = result[0];
          res.redirect("/profile");
        } else {
          res.redirect("/register");
        }
      } else {
        res.render("error", { ErrorMsg: "Wrong email/password", Route: "/" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
