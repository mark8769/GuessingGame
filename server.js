// import the express library
const express = require("express");
// start express application
const app = express();
// serve up static files from the folder "public"
app.use(express.static("public"));

// start the server, and listen on port 3000
app.listen(3000);
