const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app =express();

app.set("view engine", "ejs");
app.set('views', 'views');

//catch all favicon get request and return it to 204(no content status code)
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname , 'public')));

app.use(routes);

app.listen(process.env.PORT || 5000, (err)=> {
    if(err)
    console.log(err);
    console.log("server connected at "+ PORT);
})