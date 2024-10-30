//Using Express
const express = require('express')

//create an instance of express
const app = express();



//Start the server
const port = 3000;
app.listen(port, () => {
    console.log("Server is listening to the port " + port);
})