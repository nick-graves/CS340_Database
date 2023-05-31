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
    let get_hikes = `SELECT HikeID, Name, Location, Distance, Elevation, Difficulty, Description FROM Hikes;`;

    db.pool.query(get_hikes, function(error, hikes_rows, fields) 
    {
        if (error) 
        {
            console.error(error);
            res.sendStatus(500);
        } 
        else 
        {
            res.render('hikes', { hikes: hikes_rows });
        }

    });


});

// renders get hikes
app.get('/edit_hikes', function(req, res)
{
    let getHikesQuery = "SELECT HikeID, Name FROM Hikes";
    db.pool.query(getHikesQuery, function(error, hikes_rows) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else {
            res.render('edit_hikes', { hikes: hikes_rows });
        }
    });
    //res.render('edit_hikes', {});
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


app.post('/delete_new_hike', function(req, res)
{
    let hikeID = req.body.hike;

    let delete_hikes = 'DELETE FROM Hikes WHERE hikeID = ?';
    let delete_hikes_review = 'DELETE FROM Reviews WHERE hikeID = ?';
    let delete_hikes_saved = 'DELETE FROM Saved WHERE hikeID = ?';
    
    let parameters = [hikeID];


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


});




app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});