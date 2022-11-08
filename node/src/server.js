import app from './app';

const express       = require('express')
const bodyParser    = require('body-parser');
var cors = require('cors')
const app           = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/my-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/my-app/index.html'));
});


app.use(cors());
app.options('*', cors());

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
