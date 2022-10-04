const express = require("express");
const app = express();
const path = require('path');

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'build'))); //



app.use(function(req, res, next){
    res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
app.listen(3000,()=>{
  console.log("server runnunig on port 3000")
})