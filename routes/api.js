var express = require("express");
var csvRouter = require('./csv');

var app = express();

app.use("/csv/", csvRouter);

module.exports = app;