"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const Post_1 = require("./Post");
const CommentClient_1 = require("./CommentClient");
const Database_1 = require("../Functions/Database");
class Comment extends Post_1.Post {
    constructor(id, author, sections, parents) {
        super(id, author, null, sections);
        this.parents = parents;
    }
    toClient() {
        var clientComments = [];
        for (var currentComment = 0; currentComment < this.comments.length; currentComment++) {
            clientComments.push(this.comments[currentComment].toClient());
        }
        Database_1.users.findOne({ id: this.author }).then(dbRes => {
            if (dbRes.username) {
                return new CommentClient_1.CommentClient(this.id, dbRes.username, this.dateCreated, this.sections, clientComments, this.parents);
            }
            else {
                return null;
            }
        });
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map