"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const Post_1 = require("./Post");
class Comment extends Post_1.Post {
    constructor(id, author, content) {
        super(id, author, content);
        this.parents = [];
    }
}
exports.Comment = Comment;
function toClient() {
}
//# sourceMappingURL=Comment.js.map