const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const forCast = require("./utils/forcaste");
const geoCode = require("./utils/geocode");
const say = console.log;

//define paths for express config
const pubFolder = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebar engine and view location.
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(pubFolder));

app.get("", (req, res) => {
  res.render("index", {
    title: "the main page",
    name: "amit kumawat",
    role: "full stack developer",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about amit kumawat",
    data: "this is something about me",
    name: "akku",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    data: "help you",
    name: "chetna ",
  });
});

app.get("/weather", (req, res) => {
  let address = req.query.address;
  if (!address) return res.send({error:"please give address"});
  
  geoCode(req.query.address,(err,{mapcord,placeName} = {}) => {
    if(err) return res.send({error:'error in getting cords'});
    forCast(mapcord,(err, {weather_descriptions, temperature ,feelslike} = {}) => {
      res.send({
        weather_descriptions, temperature ,feelslike,placeName
      })
    })
  })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "not available",
    error: "help article not found",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) return res.send("please pass string for search");
  res.send({
    product: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "not available",
    error: "page not found",
  });
});

app.listen(3000, () => {
  say("connected on port 3000");
});
