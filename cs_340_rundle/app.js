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
// app.get('/hikes', function(req, res)
// {
//     // populates hikes page
//     let get_hikes = `SELECT HikeID, Name, Location, Distance, Elevation, Difficulty, Description FROM Hikes;`;

//     db.pool.query(get_hikes, function(error, hikes_rows, fields) 
//     {
//         if (error) 
//         {
//             console.error(error);
//             res.sendStatus(500);
//         } 
//         else 
//         {
//             res.render('hikes', { hikes: hikes_rows });
//         }

//     });


// });

// renders get hikes
app.get('/edit_hikes', function(req, res)
{
    let getHikesQuery = "SELECT HikeID, Name FROM Hikes";
    let getUsersQuery = "SELECT UserID, Name FROM Users";
    let getReviewsQuery = "SELECT ReviewID FROM Reviews";
    let getSavedQuery = 'SELECT SavedHikeID, HikeID, UserID FROM Saved;';

    db.pool.query(getHikesQuery, function(error, hikes_rows) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } 
        else 
        {
            db.pool.query(getUsersQuery, function(error, users_rows)
            {
                if (error) 
                {
                    console.error(error);
                    res.sendStatus(500);
                } 
                else
                {
                    db.pool.query(getReviewsQuery, function(error, reviews_rows)
                    {
                        if (error) 
                        {
                            console.error(error);
                            res.sendStatus(500);
                        }
                        else
                        {
                            db.pool.query(getSavedQuery, function(error, savedRows)
                            {
                                if (error) 
                                {
                                    console.error(error);
                                    res.sendStatus(500);
                                }
                                else
                                {
                                    res.render('edit_hikes', { hikes: hikes_rows, users: users_rows, reviews: reviews_rows, saved: savedRows});

                                }

                            });



                        }

                    });
                }


            });
        }
    });
    //res.render('edit_hikes', {});
});




app.get('/search', function(req, res)
{

    let getHikesQuery = 'SELECT HikeID, Name, Location, Distance, Elevation, Difficulty, Description FROM Hikes;';

    db.pool.query(getHikesQuery, function(error, hikesRows, fields) 
    {
        if (error) 
        {
            console.error(error);
            res.sendStatus(500);
        } 
        else 
        {
            res.render('searchHikes', { hikes: hikesRows});
        }
    });


});





app.get('/saved', function(req, res) {
    // Retrieve saved hikes data from the database
    let getSavedQuery = 'SELECT SavedHikeID, HikeID, UserID FROM Saved;';

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

app.get('/users', function(req, res) {
    // Retrieve saved hikes data from the database
    let getUsersQuery = 'SELECT UserID, Name, Email, Password FROM Users;';

    db.pool.query(getUsersQuery, function(error, userRows, fields) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            // Render the 'saved' template and pass the saved hikes data to it
            res.render('users', { users: userRows });
        }
    });
});
app.get('/hikes', function(req, res)
{
    // populates hikes page
    let getHikesQuery = 'SELECT HikeID, Name, Location, Distance, Elevation, Difficulty, Description FROM Hikes;';
    let getReviewsQuery = 'SELECT ReviewID, UserID, HikeID, Rating, Comment FROM Reviews;';

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

// delete a hike
app.post('/delete_new_hike', function(req, res)
{
    let hikeID = req.body.hike;

    let delete_hikes = 'DELETE FROM Hikes WHERE hikeID = ?';
    let delete_hikes_review = 'DELETE FROM Reviews WHERE hikeID = ?';
    let delete_hikes_saved = 'DELETE FROM Saved WHERE hikeID = ?';
    
    let parameters = [hikeID];


    db.pool.query(delete_hikes_saved, parameters, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            db.pool.query(delete_hikes_review, parameters, function(error, result)
            {   
                if (error)
                {
                    console.log(error);
                    res.sendStatus(500);
                }
                else
                {
                    db.pool.query(delete_hikes, parameters, function(error, result)
                    {
                        if (error)
                        {
                            console.log(error);
                            res.sendStatus(500);
                        }
                        else
                        {
                            res.redirect('/hikes');

                        }

                    });
                }
            });

        }

    });

});


// modify a hike
app.post('/modify_hike', function(req, res)
{
    let form_input = req.body;
    let HikeID = req.body.hike;

    let parameters_name = [form_input['input-Name'], HikeID];
    let parameters_location = [form_input['input-Location'], HikeID];
    let parameters_distance = [form_input['input-Distance'], HikeID];
    let parameters_elevation = [form_input['input-Elevation'], HikeID];
    let parameters_difficulty = [form_input['input-Difficulty'], HikeID];
    let parameters_description = [form_input['input-Description'], HikeID];



    let modify_name = 'UPDATE Hikes SET Name = ? WHERE HikeID = ?;';
    let modify_location = 'UPDATE Hikes SET Location = ? WHERE HikeID = ?;';
    let modify_distance = 'UPDATE Hikes SET Distance = ? WHERE HikeID = ?;';
    let modify_elevation = 'UPDATE Hikes SET Elevation = ? WHERE HikeID = ?;';
    let modify_difficulty = 'UPDATE Hikes SET Difficulty = ? WHERE HikeID = ?;';
    let modify_description = 'UPDATE Hikes SET Description = ? WHERE HikeID = ?;';


    db.pool.query(modify_name, parameters_name, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            db.pool.query(modify_location, parameters_location, function(error, result)
            {
                if (error) 
                {
                    console.log(error);
                    res.sendStatus(500);
                }
                else
                {
                    db.pool.query(modify_distance, parameters_distance, function(error, result)
                    {
                        if (error) 
                        {
                            console.log(error);
                            res.sendStatus(500);
                        }
                        else
                        {
                            db.pool.query(modify_elevation, parameters_elevation, function(error, result)
                            {
                                if (error) 
                                {
                                    console.log(error);
                                    res.sendStatus(500);
                                }
                                else
                                {
                                    db.pool.query(modify_difficulty, parameters_difficulty, function(error, result)
                                    {
                                        if (error) 
                                        {
                                            console.log(error);
                                            res.sendStatus(500);
                                        }
                                        else
                                        {
                                            db.pool.query(modify_description, parameters_description, function(error, result)
                                            {
                                                if (error) 
                                                {
                                                    console.log(error);
                                                    res.sendStatus(500);
                                                }
                                                else
                                                {
                                                    res.redirect('/hikes');
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

            });
        }
    });
});


app.post('/add_new_user', function(req, res)
{
    let form_input = req.body;

    let parameters = [
        form_input['input-Name'],
        form_input['input-Email'],
        form_input['input-Password']
    ];

    let add_new_user = `INSERT INTO Users (Name, Email, Password) 
                        VALUES (?, ?, ?)`;

    
    
    
    db.pool.query(add_new_user, parameters, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {


            res.redirect('/users');
        }


    });


});


// add a new review
app.post('/add_review', function(req, res)
{
    let form_input = req.body;
    let hikeID = req.body.hike;
    let userID = req.body.user;



    let add_new_review = `INSERT INTO Reviews (UserID, HikeID, Rating, Comment) 
                            VALUES (?, ?, ?, ?)`;
 
                      

    let parameters = [userID, hikeID, form_input['input-Rating'], form_input['input-Review']]


    db.pool.query(add_new_review, parameters, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            
            res.redirect('/hikes');
        }


    });

});





app.post('/delete_review', function(req, res)
{
    let reviewID = req.body.review;

    let delete_review = 'DELETE FROM Reviews WHERE ReviewID = ?';

    db.pool.query(delete_review, reviewID, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            
            res.redirect('/hikes');
        }


    });

});



app.post('/save_hike', function(req, res)
{
    let form_input = req.body;
    let hikeID = req.body.hike;
    let userID = req.body.user;

    let parameters = [userID, hikeID];

    let save_hike = `INSERT INTO Saved (UserID, HikeID)
                    VALUES (?, ?)`;



    db.pool.query(save_hike, parameters, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            
            res.redirect('/saved');
        }


    });

});


app.post('/delete_saved_hike', function(req, res)
{

    let hikeID = req.body.hike;
    let userID = req.body.user;

    parameters = [userID, hikeID]

    let delete_saved_hike = `DELETE FROM Saved WHERE UserID = ? AND HikeID = ?`;

    db.pool.query(delete_saved_hike, parameters, function(error, result)
    {
        if (error) 
        {
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            
            res.redirect('/saved');
        }


    });

});

app.post('/delete_user', function(req, res)
{
    let userID = req.body.user;

    let delete_user = 'DELETE FROM Users WHERE UserID = ?';
    let delete_user_review = 'DELETE FROM Reviews WHERE UserID = ?';
    let delete_user_saved = 'DELETE FROM Saved WHERE UserID = ?';
    
    let parameters = [userID];
    

    db.pool.query(delete_user_saved, parameters, function(error, result)
    {
        if (error) 
        {
            
            console.log(error);
            res.sendStatus(500);
        }
        else
        {
            db.pool.query(delete_user_review, parameters, function(error, result)
            {   
                if (error)
                {
                    console.log(error);
                    res.sendStatus(500);
                }
                else
                {
                    db.pool.query(delete_user, parameters, function(error, result)
                    {
                        if (error)
                        {
                            console.log(error);
                            res.sendStatus(500);
                        }
                        else
                        {
                            res.redirect('/users');

                        }

                    });
                }
            });

        }

    });

});





app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});