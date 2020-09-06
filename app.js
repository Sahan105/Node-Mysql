const express = require("express");
const mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });
const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));
//pasrse URL encoded bodies(as from HTmL page)

//Define Routers
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("msql connected....");
  }
});
app.listen(8000, () => {
  console.log(`Server started on port 8000`);
});
