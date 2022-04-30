import { CommentClient } from './CommentClient';
import { Section } from './Section';

export class PostClient {
    id: number;
    author: number;
    dateCreated: number;
    title: string;
    sections: Array<Section>;
    comments: Array<CommentClient>;

    constructor(id: number, author: number, dateCreated: number, title: string, sections: Array<Section>, comments: Array<CommentClient>) {
        this.id = id;
        this.author = author;
        this.dateCreated = dateCreated;
        this.title = title;
        this.sections = sections;
        this.comments = comments;
    }
}
