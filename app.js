/**
 * Created by Dylan on 7/21/2017.
 */
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('src'));

var bodyParser = require('body-parser');
var urest = require("unirest");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

console.log("started server");

app.post("/userData", function (req, res) {
    urest.get("https://battlefieldtracker.com/bf1/api/Stats/BasicStats?platform=" + req.body.data.platform + "&displayName=" + req.body.data.username + "&game=tunguska")
        .header("TRN-Api-Key", "8b8e6398-d9b0-4009-a5d8-051184037838")
        .header("Accept", "application/json")
        .end(function (result) {
            res.send(result.body);

        });


});

app.post("/getUserWeapons", function (req, res) {
    urest.get("https://battlefieldtracker.com/bf1/api/Progression/GetWeapons?platform=" + req.body.data.platform + "&displayName=" + req.body.data.username + "&game=tunguska")
        .header("TRN-Api-Key", "8b8e6398-d9b0-4009-a5d8-051184037838")
        .header("Accept", "application/json")
        .end(function (result) {
            res.send(result.body);
        });

});
app.listen(3000);
