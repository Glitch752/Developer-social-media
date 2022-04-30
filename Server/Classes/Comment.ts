import { Post } from './Post';
import { Section } from './Section';
import { CommentClient } from './CommentClient';

export class Comment extends Post {
    id: number;
    author: number;
    dateCreated: number;
    sections: Array<Section>;
    comments: Array<Comment>;
    parents: Array<number>;

    constructor(id: number, author: number, sections: Array<Section>, parents: Array<number>) {
        super(id, author, null, sections);

        this.parents = parents;
    }

    public toClient() {
        var clientComments: Array<CommentClient> = [];

        for (var currentComment = 0; currentComment < this.comments.length; currentComment++) {
            clientComments.push(this.comments[currentComment].toClient());
        }

        return new CommentClient(this.id, this.author, this.dateCreated, this.sections, clientComments, this.parents);
    }
}