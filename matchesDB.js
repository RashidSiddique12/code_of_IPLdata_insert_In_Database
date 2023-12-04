const sql = require("mysql2/promise");
const matches = require("./Data/matches.json");
require('dotenv').config()

const connection = sql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "IPL",
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS Matches(
    id INT AUTO_INCREMENT PRIMARY KEY,
    season VARCHAR(4),
    city VARCHAR(50),
    date DATE,
    team1 VARCHAR(50),
    team2 VARCHAR(50),
    toss_winner VARCHAR(50),
    toss_decision VARCHAR(10),
    result VARCHAR(10),
    dl_applied INT,
    winner VARCHAR(50),
    win_by_runs INT,
    win_by_wickets INT,
    player_of_match VARCHAR(50),
    venue VARCHAR(100),
    umpire1 VARCHAR(50),
    umpire2 VARCHAR(50),
    umpire3 VARCHAR(50)
)`;

const insertDataIntoTable = `INSERT INTO Matches VALUES ?`;

connection
  .getConnection()
  .then(() => {
    console.log("Database connected")
    return connection.query(createTableQuery);
  })
  .then(() => {
    console.log("Deliveries Table created!")
    return connection.query(insertDataIntoTable, [matches.map((ele) => Object.values(ele))]);
  })
  .then(()=>{
    console.log("Data inserted")
  })
  .catch((err) => {
    console.log(err.message);
  })
  .finally(() => {
    connection.end();
  });

