"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentClient = void 0;
const PostClient_1 = require("./PostClient");
class CommentClient extends PostClient_1.PostClient {
    constructor(id, author, dateCreated, sections, comments, parents) {
        super(id, author, dateCreated, null, sections, comments);
        this.parents = parents;
    }
}
exports.CommentClient = CommentClient;
//# sourceMappingURL=CommentClient.js.map