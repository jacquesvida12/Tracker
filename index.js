//Adding the required the packages
const express = require("express");
const app = express();

require('dotenv').config();

// Add packages
require("dotenv").config();
// Add database package and connection string
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.CRUNCHY_DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
});

//Set up EJS 
app.set("view engine", "ejs");

//Setup routes
app.get("/", (req, res) => {
    //res.send ("Hello world...");
    const sql = "SELECT * FROM CALORIES ORDER BY CAL_ID";
    pool.query(sql, [], (err, result) => {
        var message = "";
        var model = {};
        if(err) {
            message = `Error - ${err.message}`;
        } else {
            message = "success";
            model = result.rows;
        };
        res.render("index", {
            message: message,
            model : model
        });
    });
});

//Start listener
app.listen(process.env.PORT || 3000, () => {
    console.log("The Server has now started at (http://localhost:3000/")
});