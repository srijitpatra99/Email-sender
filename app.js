require("dotenv").config();
const path = require("path");

const express = require("express");

const routes = require("./routes");

const port = process.env.PORT || 5000;

const app =express();

app.set("view engine", "ejs");
app.set('views', 'views');

//catch all favicon get request and return it to 204(no content status code)
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname , 'public')));

app.use(routes);

app.listen(port, (err)=> {
    if(err)
    console.log(err);
    console.log("server connected at "+ port);
})