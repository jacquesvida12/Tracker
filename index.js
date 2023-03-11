//Adding the required the packages
const express = require("express");
const app = express();

require('dotenv').config();
const path = require('path');

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // <--- middleware configuration


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

//=====================================================================
app.get("/manage", (req, res) => {
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
        res.render("manage", {
            message: message,
            model : model
        });
    });
});

//=============================================================================================

// GET /edit/5
app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM CALORIES WHERE cal_id = $1";
    pool.query(sql, [id], (err, result) => {
      // if (err) ...
      res.render("edit", { model: result.rows[0] });
    });
  });

  // POST /edit/5
app.post("/edit/:id", (req, res) => {
    const id = req.params.id;
    const meal = [req.body.Name, req.body.Meal, req.body.Protein, req.body.Carbs, req.body.Fats, req.body.Calories, req.body.Date, req.body.Time, req.body.Notes,id];
    const sql = "UPDATE CALORIES SET cal_name = $1, cal_meal = $2, cal_protein = $3, cal_carbs = $4, cal_fats = $5, cal_calories = $6, cal_date = $7, cal_time = $8, cal_notes = $9 WHERE (cal_id = $10)";
    pool.query(sql, meal, (err, result) => {
      // if (err) ...
      if (err)
      console.log(err);
      res.redirect("/");
    });
  });



app.get("/create", (req, res) => {
    const id = req.params.id;
      res.render("create", { model:{} });
    });
// POST /create
app.post("/create", (req, res) => {
    const sql = "INSERT INTO CALORIES (cal_name, cal_meal, cal_protein, cal_carbs, cal_fats,cal_calories, cal_date, cal_time, cal_notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const meal = [req.body.Name, req.body.Meal, req.body.Protein, req.body.Carbs, req.body.Fats, req.body.Calories, req.body.Date, req.body.Time, req.body.Notes];
    pool.query(sql, meal, (err, result) => {
      // if (err) ...
      if (err)
      console.log(err)
      res.redirect("/");
    });
  });

//Start listener
app.listen(process.env.PORT || 3000, () => {
    console.log("The Server has now started at (http://localhost:3000/")
});