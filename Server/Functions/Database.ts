import { MongoClient, Db, Collection } from 'mongodb';

const url = 'mongodb://localhost:27017';
var db: Db;
var users: Collection;
var posts: Collection;

function initDatabase() {
    MongoClient.connect(url, (err, client) => {
        if (err) throw err;

        console.log('Connected to mongodb');

        db = client.db("stackunderflow");
        users = db.collection("users");
        posts = db.collection("posts");
    });
}

export { initDatabase, db, users, posts };