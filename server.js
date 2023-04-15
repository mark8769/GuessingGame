/*
Mark Ortega-Ponce
4/14/23
server.js
*/

// import the express library
const express = require("express");
// start express application
const app = express();
// serve up static files from the folder "public"
app.use(express.static("public"));
// Set up get route.
app.get("/random", function(req, res){
    // Random number between 1-100
    let randomInt = Math.floor(Math.random() * 100) + 1;
    let obj = {randomNumber: randomInt};
    // Send back json response.
    res.json(JSON.stringify(obj));
});

app.listen(3131, function() {
    console.log("Listening on port 3131.");
});

// Find PID (process) that is listening on port number:
// lsof -i :portNumber(8000,3131 etc...)
// kill PID
