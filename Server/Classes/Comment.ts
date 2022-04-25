import { Post } from './Post';

export class Comment extends Post {
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
