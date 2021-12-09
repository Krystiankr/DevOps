const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.on("connect", client => {
  client
     .query("CREATE TABLE IF NOT EXISTS values (id INT, marka VARCHAR, model VARCHAR, cena INT, color VARCHAR)")
    .catch(err => console.log("PG ERROR", err));
  client
     .query("INSERT INTO values values (1, 'Audi', 'Q3', 200000, 'czerwony'), (2, 'BMW', 'Z4', 678000, 'czarny'), (3, 'Fiat', '124', 2000,'czerwony'), (4, 'Fiat', 'Panda', 10000,'srebrny'), (5, 'Mercedes', 'C197', 210000,'bialy')")
    .catch(err => console.log("PG ERROR", err));
});

//Express route definitions
app.get("/", (req, res) => {
  res.send("Hi");
});

// get the values
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values);
});

// now the post -> insert value
app.post("/values", async (req, res) => {
  if (!req.body.value) res.send({ working: false });

  pgClient.query("INSERT INTO values(number, marka, model, cena, color) VALUES($1, $1+1, $1+2, $1+3, $1+4)", [req.body.value]);
  res.send({ working: true });
});

app.listen(5000, err => {
  console.log("Listening");
});
