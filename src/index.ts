const cors=require('cors');
const express =  require('express');
const bodyparser = require('body-parser');
const product = require('./routes/products');
const user = require('./routes/users'); 

const path = require('path');
var app= express();
app.use(cors());
app.use(bodyparser.json());

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));

app.get('/', (req, res) => {
    res.send('welcome');
});
app.use('/product',product);
app.use('/users',user);