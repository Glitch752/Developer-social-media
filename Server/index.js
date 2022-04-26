"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongodb_1 = require("mongodb");
const DataHandler = require("./Functions/DataHandler");
const User_1 = require("./Classes/User");
//#region Express initialization
const app = express();
app.use(cors());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//#endregion
//#region Database initialization
const url = 'mongodb://127.0.0.1:27017';
var db;
var users;
var posts;
mongodb_1.MongoClient.connect(url, (err, client) => {
    if (err)
        throw err;
    console.log('Connected to mongodb');
    db = client.db("stackunderflow");
    users = db.collection("users");
    posts = db.collection("posts");
    // var testUser: User = new User(0, "test", "test", "test", "test", "test", 0);
    // testUser.setNewAuthKey();
    // users.insertOne(testUser, (err, result) => {
    //     if (err) throw err;
    //     console.log("Inserted test user");
    // });
});
//#endregion
app.get('/api/v1/getFeedPosts', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    // TODO: Get posts from database
    res.send(JSON.stringify(data));
});
app.get('/api/v1/getFullPost', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    // TODO: Get full post from database
    res.send(JSON.stringify(data));
});
app.post('/api/v1/createPost', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    // TODO: Create post and return post data to client
    res.send(JSON.stringify(data));
});
app.post('/api/v1/createComment', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    // TODO: Create comment and return comment data to client
    res.send(JSON.stringify(data));
});
// Login and register
app.post('/api/v1/auth/login', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    const body = req.body;
    console.log("Username: " + body.username + " Password: " + body.password);
    users.findOne({ $or: [{ username: `${body.username}` }, { email: `${body.username}` }] }).then(dbRes => {
        // Checks if the user is in database.
        if (!dbRes) {
            data = { response: "User not found", success: false };
            res.send(JSON.stringify(data));
            return;
        }
        // Converts the json object to a user object.
        var user = new User_1.User(dbRes.id, dbRes.username, dbRes.email, dbRes.password, dbRes.firstName, dbRes.lastName, dbRes.birthDate, true);
        // Checks if the password is correct.
        if (!user.checkPassword(body.password)) {
            data = { response: "Wrong password", success: false };
            res.send(JSON.stringify(data));
            return;
        }
        // Returns new authkey if the password is correct.
        data = { response: "Login successful", success: true, data: { authKey: user.setNewAuthKey() } };
        res.send(JSON.stringify(data));
    });
});
app.post('/api/v1/auth/verify', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    res.send(JSON.stringify(data));
});
app.post('/api/v1/auth/register', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    const body = req.body;
    console.log(`${JSON.stringify(body)} \n`);
    const minimumAgeYears = 13;
    const minimumAge = new Date(Date.now() - (minimumAgeYears * 365 * 24 * 60 * 60 * 1000));
    const birthDate = new Date(parseInt(body.birthDate)).getTime();
    if (birthDate > minimumAge.getTime()) {
        data = { response: `Age verification failed: You must be at least ${minimumAgeYears} years old.`, success: false };
        res.send(JSON.stringify(data));
        return;
    }
    users.findOne({ $or: [{ username: `${body.username}` }, { email: `${body.username}` }] }, (err, dbRes) => {
        if (dbRes) {
            data = { response: "Username or email already exists", success: false };
            res.send(JSON.stringify(data));
            return;
        }
        var user = new User_1.User(DataHandler.currentUser, body.username, body.email, body.password, body.firstName, body.lastName, parseInt(body.birthDate));
        var authKey = user.setNewAuthKey();
        data = { response: "Request succeeded", success: true, data: { authKey: authKey } };
        users.insertOne(user, (err, result) => {
            if (err) {
                data = { response: "Database error", success: false };
                res.send(JSON.stringify(data));
                throw err;
            }
            console.log("Added new user");
        });
        res.send(JSON.stringify(data));
    });
});
//#region Express closing initialization
const port = 25564; // TODO: CHANGE PORT TO PREFFERRED PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));
//#endregion
//# sourceMappingURL=index.js.map