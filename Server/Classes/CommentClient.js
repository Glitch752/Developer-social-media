"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentClient = void 0;
const PostClient_1 = require("./PostClient");
class CommentClient extends PostClient_1.PostClient {
    constructor(id, author, content) {
        super(id, author, content);
        this.parents = [];
    }
}
exports.CommentClient = CommentClient;
//# sourceMappingURL=CommentClient.js.map