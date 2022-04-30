"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const Post_1 = require("./Post");
const CommentClient_1 = require("./CommentClient");
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
        return new CommentClient_1.CommentClient(this.id, this.author, this.dateCreated, this.sections, clientComments, this.parents);
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map