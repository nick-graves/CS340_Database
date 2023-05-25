var db = require('./db_connector')




const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;
app.use(express.json());


app.get('/', function(req, res) {
  // Define the SQL queries needed to populate data on the page
  let get_reviews = `SELECT ReviewID, UserID, HikeID, Rating, Comment FROM Reviews;`;

  db.pool.query(get_reviews, function(error, reviews_rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.render('reviews', { reviews: reviews_rows });
    }
  });
});

// Called when user adds a new review
app.post('/add_new_review', function(req, res) {
  // Capture the incoming data and parse it back to a JS object
  let form_input = req.body;

  // Create the query and run it on the database to insert a new review
  let insert_review = `INSERT INTO Reviews (UserID, HikeID, Rating, Comment)
                        VALUES (?, ?, ?, ?)`;
  let parameters = [
    form_input['input-user_id'],
    form_input['input-hike_id'],
    form_input['input-rating'],
    form_input['input-comment']
  ];

  db.pool.query(insert_review, parameters, function(error, result) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      // After the insertion, retrieve the updated list of reviews from the database
      let get_reviews = `SELECT ReviewID, UserID, HikeID, Rating, Comment FROM Reviews`;
      db.pool.query(get_reviews, function(error, reviews_rows) {
        if (error) {
          console.log(error);
          res.sendStatus(500);
        } else {
          res.render('reviews', { reviews: reviews_rows });
        }
      });
    }
  });
});

// Called when user deletes a review
app.post('/delete_review', function(req, res) {
  let reviewId = req.body.review_id;

  // Create the delete query and run it on the database
  let deleteReview = 'DELETE FROM Reviews WHERE ReviewID = ?';
  let parameters = [reviewId];

  db.pool.query(deleteReview, parameters, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    }
  });
});

// Called when user updates a review
app.post('/update_review', function(req, res) {
  let reviewId = req.body.review_id;

  // Create the update query and run it on the database
  let updateReview =
    'UPDATE Reviews SET UserID = ?, HikeID = ?, Rating = ?, Comment = ? WHERE ReviewID = ?';
  let parameters = [
    req.body['input-update_user_id'],
    req.body['input-update_hike_id'],
    req.body['input-update_rating'],
    req.body['input-update_comment'],
    reviewId
  ];

  db.pool.query(updateReview, parameters, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    }
  });
});






app.listen(port, () => 
{
    console.log(`Server is running on port ${port}`);
});