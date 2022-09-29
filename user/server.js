const UPLOADS = __dirname+'/uploads';
require('./connection/mongodb.connection')();
const path = require('path');

const express = require("express");

const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000


app.use(cors());
app.use(express.urlencoded({ extended: true }));
//intitializing body parser
app.use(express.json({limit: '50mb'}))
// connecting to databas

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use("/api/v1/user", require("./routes/user.route")(express,UPLOADS));
// app.use(function(req, res, next){
//   res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
  });


