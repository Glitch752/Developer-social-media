import { PostClient } from './PostClient';

export class CommentClient extends PostClient {
    id: number;
    author: number;
    dateCreated: number;
    content: string;
    comments: Array<Comment>;
    parents: Array<number>;

    constructor(id: number, author: number, content: string) {
        super(id, author, content);

        this.parents = [];
    }
}
