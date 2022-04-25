"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const BSON = require('bson');
const mongodb_1 = require("mongodb");
const DataHandler = require("./Functions/DataHandler");
const User_1 = require("./Classes/User");
//#region Express initialization
const app = express();
app.use(cors());
//#endregion
//#region Database initialization
const url = 'mongodb://localhost:27017';
const client = new mongodb_1.MongoClient(url);
var db;
var users;
var posts;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        db = client.db("stackunderflow");
        users = db.collection('users');
        posts = db.collection('posts');
    });
}
//#endregion
app.get('/api/v1/getFeedPosts', (req, res) => {
    var data = { response: "Request failed", success: false };
    // TODO: Get posts from database
    res.send(JSON.stringify(data));
});
app.get('/api/v1/getFullPost', (req, res) => {
    var data = { response: "Request failed", success: false };
    // TODO: Get full post from database
    res.send(JSON.stringify(data));
});
app.post('/api/v1/createPost', (req, res) => {
    var data = { response: "Request failed", success: false };
    // TODO: Create post and return post data to client
    res.send(JSON.stringify(data));
});
app.post('/api/v1/createComment', (req, res) => {
    var data = { response: "Request failed", success: false };
    // TODO: Create comment and return comment data to client
    res.send(JSON.stringify(data));
});
// Login and register
app.post('/api/v1/auth/login', (req, res) => {
    var data = { response: "Request failed", success: false };
    const formData = req.body;
    data = { response: "Request succeeded", success: true, data: { authKey: users[0].setNewAuthKey() } }; // Todo: Get user id from database
    res.send(JSON.stringify(data));
});
app.post('/api/v1/auth/verify', (req, res) => {
    var data = { response: "Request failed", success: false };
    res.send(JSON.stringify(data));
});
app.post('/api/v1/auth/register', (req, res) => {
    var data = { response: "Request failed", success: false };
    console.log(req.body);
    const body = JSON.parse(req.body);
    const minimumAgeYears = 13;
    const minimumAge = new Date(Date.now() - (minimumAgeYears * 365 * 24 * 60 * 60 * 1000));
    const birthDate = new Date(parseInt(body.birthDate)).getTime();
    if (birthDate > minimumAge.getTime()) {
        data = { response: `Age verification failed: You must be at least ${minimumAgeYears} years old.`, success: false };
        res.send(JSON.stringify(data));
        return;
    }
    // TODO: Check if username or email already exists in database
    var user = new User_1.User(DataHandler.currentUser, body.username, body.email, body.password, body.firstName, body.lastName, parseInt(body.birthDate));
    var authKey = user.setNewAuthKey();
    data = { response: "Request succeeded", success: true, data: { authKey: authKey } };
    users.insertOne(BSON.serialize(user));
    res.send(JSON.stringify(data));
});
//#region Express closing initialization
const port = 25564; // TODO: CHANGE PORT TO PREFFERRED PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));
//#endregion
//# sourceMappingURL=index.js.map