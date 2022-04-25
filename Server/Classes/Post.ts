import { Comment } from './Comment';

export class Post {
    id: number;
    author: number;
    dateCreated: number;
    content: string;
    comments: Array<Comment>;

    constructor(id: number, author: number, content: string) {
        this.id = id;
        this.author = author;
        this.dateCreated = new Date().getTime();
        this.content = content;
    }
}
