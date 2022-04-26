"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = exports.users = exports.db = exports.initDatabase = void 0;
const mongodb_1 = require("mongodb");
const url = 'mongodb://localhost:27017';
var db;
exports.db = db;
var users;
exports.users = users;
var posts;
exports.posts = posts;
function initDatabase() {
    mongodb_1.MongoClient.connect(url, (err, client) => {
        if (err)
            throw err;
        console.log('Connected to mongodb');
        exports.db = db = client.db("stackunderflow");
        exports.users = users = db.collection("users");
        exports.posts = posts = db.collection("posts");
    });
}
exports.initDatabase = initDatabase;
//# sourceMappingURL=Database.js.map