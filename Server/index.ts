const express = require('express');
const cors = require('cors');
const BSON = require('bson');

import { MongoClient, Db, Collection } from 'mongodb';

import * as DataHandler from './Functions/DataHandler';
import { User } from './Classes/User';

//#region Express initialization

const app = express();
app.use(cors());

//#endregion

//#region Database initialization

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
var db: Db;
var users: Collection;
var posts: Collection;

async function main() {
    await client.connect();
    db = client.db("stackunderflow");
    users = db.collection('users');
    posts = db.collection('posts');
}

//#endregion

app.get('/api/v1/getFeedPosts', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    // TODO: Get posts from database

    res.send(JSON.stringify(data));
});

app.get('/api/v1/getFullPost', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    // TODO: Get full post from database

    res.send(JSON.stringify(data));
});

app.post('/api/v1/createPost', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    // TODO: Create post and return post data to client

    res.send(JSON.stringify(data));
});

app.post('/api/v1/createComment', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    // TODO: Create comment and return comment data to client

    res.send(JSON.stringify(data));
});

// Login and register

app.post('/api/v1/auth/login', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    const formData = req.body;

    data = { response: "Request succeeded", success: true, data: { authKey: users[0].setNewAuthKey() } }; // Todo: Get user id from database

    res.send(JSON.stringify(data));
});

app.post('/api/v1/auth/verify', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    res.send(JSON.stringify(data));
});

app.post('/api/v1/auth/register', (req, res) => {
    var data: any = { response: "Request failed", success: false };

    console.log(req.body);
    const body = JSON.parse(req.body);

    const minimumAgeYears = 13;
    const minimumAge = new Date(Date.now() - (minimumAgeYears * 365 * 24 * 60 * 60 * 1000));

    const birthDate = new Date(parseInt(body.birthDate)).getTime();

    if(birthDate > minimumAge.getTime()) {
        data = { response: `Age verification failed: You must be at least ${minimumAgeYears} years old.`, success: false };
        res.send(JSON.stringify(data));
        return;
    }

    // TODO: Check if username or email already exists in database

    var user = new User(
        DataHandler.currentUser,
        body.username,
        body.email,
        body.password,
        body.firstName,
        body.lastName,
        parseInt(body.birthDate)
    );

    var authKey = user.setNewAuthKey();

    data = { response: "Request succeeded", success: true, data: { authKey: authKey } };

    users.insertOne(BSON.serialize(user));

    res.send(JSON.stringify(data));
});

//#region Express closing initialization

const port = 25564; // TODO: CHANGE PORT TO PREFFERRED PORT

app.listen(port, () => console.log(`Listening on port ${port}...`));

//#endregion