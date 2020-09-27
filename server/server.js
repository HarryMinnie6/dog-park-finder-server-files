//***----------------------------below lines are always required------------------------------------***

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");
const app = express();
const path = require("path"); //<-for heroku

//middleware is a function that recieves a request and will send it to the next middleware or the final middleware known as a route handler
//<<<------below code is 3rd party middleware ----->>>
app.use(cors());
app.use(express.json());
//+*+*------------FOR HEROKU-------------------+*+*
// if (process.env.NODE_ENV === "production") {
//   //serve static content
//   app.use(express.static(path.join(__dirname, "front-end/build")));
// }
//+*+*----------------------------------------------------+*+*
//<<<---------------------------------------------->>>
const port = process.env.PORT || 3001; //<-- if process.env.PORT is not defined set port to 3001. PORT comes from the .env file
app.listen(port, () => {
  console.log(`server is running and listening on port ${port}`);
});
// ***---------------------------------------------------------------------------------------------***

//Getting all parks
app.get("/api/v1/parks", async (req, res) => {
  try {
    // const results = await db.query("SELECT * from parks"); <-old query, its incorperated in this monster query below
    const parkRatingData = await db.query(
      "select * from parks left join (select park_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by park_id) reviews on parks.id = reviews.park_id;"
    );
    // console.log("results", results);
    console.log("parkratingData", parkRatingData);
    res.status(200).json({
      status: "success",
      results: parkRatingData.rows.length,
      data: {
        parks: parkRatingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Getting one park
app.get("/api/v1/parks/:id", async (req, res) => {
  try {
    const parks = await db.query(
      "select * from parks left join (select park_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by park_id) reviews on parks.id = reviews.park_id where id =$1",
      [req.params.id]
    ); // <-- the first item in the array gets passed into "$1" if their is a second parameter, it will be passed into "$2"

    const reviews = await db.query("select * from reviews where park_id = $1", [
      req.params.id,
    ]); //<--getting reviews match the parks id... when getting parks from the db

    res.status(200).json({
      status: "successful",
      data: {
        parks: parks.rows[0],
        reviews: reviews.rows, //<--getting reviews when getting parks from the db
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Creating a park
app.post("/api/v1/parks", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT into parks (name, location, park_size) values($1, $2, $3) returning * ",
      [req.body.name, req.body.location, req.body.park_size]
    );
    console.log(results);
    res.status(201).json({
      status: "successful",
      data: {
        parks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Updating a restaurant
app.put("/api/v1/parks/:id", async (req, res) => {
  try {
    const results = await db.query(
      " UPDATE parks SET name = $1, location =$2, park_size = $3 where id = $4 returning * ",
      [req.body.name, req.body.location, req.body.park_size, req.params.id]
    );
    console.log(results);
    res.status(200).json({
      status: "successful",
      data: {
        parks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Deleting a restaurant
app.delete("/api/v1/parks/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM parks where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "successfully deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

//Adding a review to a park
app.post("/api/v1/parks/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews(park_id, name, review, rating) values($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "successful",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});
