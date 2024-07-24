require("dotenv").config()
const UPLOADS = __dirname+'/uploads';
require('./connection/mongodb.connection')();
const { port } = require("./config")

const express = require("express");

const cors = require('cors');
// require('dotenv').config({path:"/.env"});
const app = express()
console.log(process.env.APP_PORT)


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}))

app.use("/api/v1/user", require("./routes/user.route")(express,UPLOADS));
app.use("/api/v1/forms", require("./routes/forms.route")(express,UPLOADS));

app.use("/uploads/",express.static(UPLOADS))


// app.use(function(req, res, next){
//   res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
  });


