const express = require('express');
const bodyParser = require('body-parser');

var morgan = require('morgan');
const app = express();
var cors = require('cors');

//parse app/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

//panggil routes
var routes = require('./routes');
routes(app);

//daftar menu routes dari index.js
app.use('/auth', require('./middleware'));

app.listen(3002, () => {
    console.log(`Server started on port 3002`);
});