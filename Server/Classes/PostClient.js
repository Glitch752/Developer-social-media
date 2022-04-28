"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostClient = void 0;
class PostClient {
    constructor(id, author, content) {
        this.id = id;
        this.author = author;
        this.dateCreated = new Date().getTime();
        this.content = content;
    }
}
exports.PostClient = PostClient;
//# sourceMappingURL=PostClient.js.map