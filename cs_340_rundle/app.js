var db = require('./db_connector')

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
const PORT  = 4000;                 // Set a port number at the top so it's easy to change in the future
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Handlebars
const { engine } = require('express-handlebars');
// const { runInNewContext } = require('vm')
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters an *.hbs file.

// Make public directory (CSS, etc,.) available to client (user's browser)
app.use(express.static('public'));



// renders homepage
app.get('/', function(req, res)
{

    res.render('homePage', {});
});

// renders hikes
app.get('/hikes', function(req, res)
{
    // populates hikes page
    let getHikesQuery = `SELECT HikeID, Name, Location, Distance, Elevation, Difficulty, Description FROM Hikes;`;
    let getReviewsQuery = `SELECT ReviewID, UserID, HikeID, Rating, Comment FROM Reviews;`;

    db.pool.query(getHikesQuery, function(error, hikesRows, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            // Once hikes data is retrieved, fetch the reviews data
            db.pool.query(getReviewsQuery, function(error, reviewsRows, fields) {
                if (error) {
                    console.error(error);
                    res.sendStatus(500);
                } else {
                    // Render the 'hikes' template and pass both hikes and reviews data to it
                    res.render('hikes', { hikes: hikesRows, reviews: reviewsRows });
                }
            });
        }
    });
});

app.get('/saved', function(req, res) {
    // Retrieve saved hikes data from the database
    let getSavedQuery = `SELECT SavedHikeID, HikeID FROM Saved;`;

    db.pool.query(getSavedQuery, function(error, savedRows, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            // Render the 'saved' template and pass the saved hikes data to it
            res.render('saved', { saved: savedRows });
        }
    });
});

// renders get hikes
app.get('/edit_hikes', function(req, res)
{

    res.render('edit_hikes', {});
});



// add new hike
app.post('/add_new_hike', function(req, res)
{
    let form_input = req.body;


    let insert_hikes = `INSERT INTO Hikes (Name, Location, Distance, Elevation, Difficulty, Description) 
                          VALUES (?, ?, ?, ?, ?, ?)`;

    let parameters = [
        form_input['input-Name'],
        form_input['input-Location'],
        form_input['input-Distance'],
        form_input['input-Elevation'],
        form_input['input-Difficulty'],
        form_input['input-Description']
    ];


    db.pool.query(insert_hikes, parameters, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }

        else
        {
            let get_hikes = `SELECT HikeID, Name, Location, Distance, Elevation, Difficulty, Description FROM Hikes;`;
            db.pool.query(get_hikes, function(error, hikes_rows) 
            {
                if (error) 
                {
                    console.log(error);
                    res.sendStatus(500); // Send HTTP response 500 for internal server error
                } 
                else 
                {
                    res.render('hikes', { hikes: hikes_rows });
                }
            });

        }


    });

});












app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});









