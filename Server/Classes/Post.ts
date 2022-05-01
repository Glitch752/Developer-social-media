import { Comment } from './Comment';
import { Section } from './Section';
import { PostClient } from './PostClient';
import { CommentClient } from './CommentClient';

import { users } from '../Functions/Database';

export class Post {
    id: number;
    author: number;
    dateCreated: number;
    title: string;
    sections: Array<Section>;
    comments: Array<Comment>;

    constructor(id: number, author: number, title: string, sections: Array<Section>, comments: Array<Comment> = []) {
        this.id = id;
        this.author = author;
        this.dateCreated = new Date().getTime();
        this.title = title;
        this.sections = sections;
        this.comments = comments;
    }

    public toClient(): any {
        var clientComments: Array<CommentClient> = [];

        for (var currentComment = 0; currentComment < this.comments.length; currentComment++) {
            clientComments.push(this.comments[currentComment].toClient());
        }

        users.findOne({ id: this.author }).then(dbRes => {
            if (dbRes.username) {
                return new PostClient(this.id, dbRes.username, this.dateCreated, this.title, this.sections,  clientComments);
            } else {
                return null;
            }
        });
    }
}
