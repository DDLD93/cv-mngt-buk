const UPLOADS = __dirname+'/uploads';
require('./connection/mongodb.connection')();
const path = require('path');
const express = require("express");
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000


app.use(cors());
app.use(express.urlencoded({ extended: true }));
//intitializing body parser
app.use(express.json())
// connecting to database

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use("/api/v1/forms/uploads",express.static(UPLOADS));
app.use("/api/v1/forms", require("./routes/forms.route")(express,UPLOADS));


// app.use(function(req, res, next){
//   res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
  });


