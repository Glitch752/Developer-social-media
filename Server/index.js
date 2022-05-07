"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database_1 = require("./Functions/Database");
const DataHandler = require("./Functions/DataHandler");
const User_1 = require("./Classes/User");
const Post_1 = require("./Classes/Post");
//#region Express initialization
const app = express();
app.use(cors());
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//#endregion
//#region Database initialization
(0, Database_1.initDatabase)();
//#endregion
//#region Current ID Variables
// TODO: MAKE BETTER SYSTEM FOR CURRENT ID VARIABLES
var nextPostId = 0;
//#endregion
function respondWithError(error, res) {
    let data = { response: error, success: false };
    res.send(JSON.stringify(data));
}
app.get('/api/v1/getFeedPosts', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    Database_1.posts.find({}).sort({ dateCreated: -1 }).limit(10).toArray().then((dbRes) => {
        if (!dbRes) {
            data = { response: "No posts found", success: false };
            res.send(JSON.stringify(data));
            return;
        }
        data = { response: "Successfully got posts", success: true, data: { posts: dbRes } };
        res.send(JSON.stringify(data));
    }).catch((err) => {
        data = { response: "Error getting posts", success: false };
        res.send(JSON.stringify(data));
    });
});
app.get('/api/v1/getFullPost', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    res.send(JSON.stringify(data));
});
app.post('/api/v1/createPost', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    const body = req.body;
    // Regex for allowed characters
    let allowedCharactersRegex = new RegExp(/[^ -~]+/);
    // Find the first character that doesn't match the regex
    let oldTitle = body.title;
    body.title = body.title.replace(allowedCharactersRegex, "");
    if (body.title !== oldTitle) {
        respondWithError("Title contains invalid character: " + oldTitle.match(allowedCharactersRegex), res);
        return;
    }
    // Check if the post has a title
    if (body.title.replace(/\s/g, '') === "") {
        respondWithError("Post must have a title", res);
        return;
    }
    // Check if the post has at least one section
    if (body.sections.length === 0) {
        respondWithError("Post must have at least one section", res);
        return;
    }
    // Check if all sections have content
    for (let section of body.sections) {
        if (section.content.replace(/\s/g, '') === "") {
            respondWithError("All sections must have content", res);
            return;
        }
    }
    var post = new Post_1.Post(nextPostId, 0, body.title, body.sections);
    Database_1.posts.insertOne(post).then(dbRes => {
        data = { response: "Successfully created post", success: true, data: { post: post.toClient() } };
        res.send(JSON.stringify(data));
        nextPostId += 1;
    }).catch((err) => {
        console.error(err);
        respondWithError("Catch Database Error: Post Creation Failed", res);
        return;
    });
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
    Database_1.users.findOne({ $or: [{ username: `${body.username}` }, { email: `${body.username}` }] }).then(dbRes => {
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
        user.setNewAuthKey();
        // Updates the user in the database.
        Database_1.users.updateOne({ id: user.id }, { $set: { authKey: user.authKey } }).then(() => {
            data = { response: "Login successful", success: true, data: { authKey: user.authKey } };
            res.send(JSON.stringify(data));
        }).catch(err => {
            data = { response: "Database Error: Login failed", success: false, data: { authKey: null } };
            res.send(JSON.stringify(data));
        });
    }).catch(err => {
        data = { response: "Database Error: Login failed", success: false, data: { authKey: null } };
        res.send(JSON.stringify(data));
    });
});
app.get('/api/v1/getUserPosts/:id', jsonParser, function (req, res) {
    // Temporary placeholder posts for testing
    var data = {
        response: "Successfully got posts",
        data: {
            posts: [
                {
                    id: 0,
                    author: "Test",
                    title: "Test Post",
                    sections: [
                        {
                            type: "Text",
                            content: "This is a test post"
                        },
                        {
                            type: "Code",
                            content: "console.log('Hello World');"
                        }
                    ]
                }
            ]
        },
        success: true
    };
    res.send(JSON.stringify(data));
});
app.post('/api/v1/auth/verify', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    const body = req.body;
    Database_1.users.findOne({ authKey: `${body.authKey}` }).then(dbRes => {
        // Checks if the user is in database.
        if (!dbRes) {
            data = { response: "User not found", success: false };
            res.send(JSON.stringify(data));
            return;
        }
        // Converts the json object to a user object.
        var user = new User_1.User(dbRes.id, dbRes.username, dbRes.email, dbRes.password, dbRes.firstName, dbRes.lastName, dbRes.birthDate, true).toClient();
        // Returns user data if the authkey is correct.
        data = { response: "Verification successful", success: true, data: { user } };
        res.send(JSON.stringify(data));
    }).catch(err => {
        data = { response: "Verification failed", success: false, data: { user: null } };
        res.send(JSON.stringify(data));
    });
    // TODO: Add multilevel security verification
});
app.post('/api/v1/auth/register', jsonParser, function (req, res) {
    var data = { response: "Request failed", success: false };
    const body = req.body;
    const minimumAgeYears = 13;
    const minimumAge = new Date(Date.now() - (minimumAgeYears * 365 * 24 * 60 * 60 * 1000));
    const birthDate = new Date(parseInt(body.birthDate)).getTime();
    if (birthDate > minimumAge.getTime()) {
        data = { response: `Age verification failed: You must be at least ${minimumAgeYears} years old.`, success: false };
        res.send(JSON.stringify(data));
        return;
    }
    Database_1.users.findOne({ $or: [{ username: `${body.username}` }, { email: `${body.username}` }] }).then(dbRes => {
        if (dbRes) {
            data = { response: "Username or email already exists", success: false };
            res.send(JSON.stringify(data));
            return;
        }
        var user = new User_1.User(DataHandler.currentUser, body.username, body.email, body.password, body.firstName, body.lastName, parseInt(body.birthDate));
        var authKey = user.setNewAuthKey();
        Database_1.users.insertOne(user).then(dbRes => {
            data = { response: "Request succeeded", success: true, data: { authKey: authKey } };
            res.send(JSON.stringify(data));
        }).catch(err => {
            data = { response: "Registration failed", success: false, data: { authKey: null } };
            res.send(JSON.stringify(data));
        });
    }).catch(err => {
        data = { response: "Registration failed", success: false, data: { user: null } };
        res.send(JSON.stringify(data));
    });
});
//#region Express closing initialization
const port = 25564; // TODO: CHANGE PORT TO PREFFERRED PORT
app.listen(port, () => console.log(`Listening on port ${port}...`));
//#endregion
//# sourceMappingURL=index.js.map