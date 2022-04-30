"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const PostClient_1 = require("./PostClient");
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
        return new PostClient_1.PostClient(this.id, this.author, this.dateCreated, this.title, this.sections, clientComments);
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map