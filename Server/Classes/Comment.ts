import { Post } from './Post';
import { Section } from './Section';
import { CommentClient } from './CommentClient';

import { users } from '../Functions/Database';

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

    public toClient(): any {
        var clientComments: Array<CommentClient> = [];

        for (var currentComment = 0; currentComment < this.comments.length; currentComment++) {
            clientComments.push(this.comments[currentComment].toClient());
        }

        users.findOne({ id: this.author }).then(dbRes => {
            if (dbRes.username) {
                return new CommentClient(this.id, dbRes.username, this.dateCreated, this.sections, clientComments, this.parents);
            } else {
                return null;
            }
        });


    }
}