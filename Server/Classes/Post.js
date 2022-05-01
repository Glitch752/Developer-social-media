"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const PostClient_1 = require("./PostClient");
const Database_1 = require("../Functions/Database");
class Post {
    constructor(id, author, title, sections, comments = []) {
        this.id = id;
        this.author = author;
        this.dateCreated = new Date().getTime();
        this.title = title;
        this.sections = sections;
        this.comments = comments;
    }
    toClient() {
        var clientComments = [];
        for (var currentComment = 0; currentComment < this.comments.length; currentComment++) {
            clientComments.push(this.comments[currentComment].toClient());
        }
        Database_1.users.findOne({ id: this.author }).then(dbRes => {
            if (dbRes.username) {
                return new PostClient_1.PostClient(this.id, dbRes.username, this.dateCreated, this.title, this.sections, clientComments);
            }
            else {
                return null;
            }
        });
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map