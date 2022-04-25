"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, author, content) {
        this.id = id;
        this.author = author;
        this.dateCreated = new Date().getTime();
        this.content = content;
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map