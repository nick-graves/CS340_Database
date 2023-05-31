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





app.get('/', function(req, res)
{

    res.render('homePage', {});
});

app.get('/hikes', function(req, res)
{
    res.render('hikes', {});
});

app.get('/edit_hikes', function(req, res)
{

    res.render('edit_hikes', {});
});






app.listen(PORT, () => 
{
    console.log(`Server is running on port ${PORT}`);
});