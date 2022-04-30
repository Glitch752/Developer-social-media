import { PostClient } from './PostClient';
import { Section } from './Section';

export class CommentClient extends PostClient {
    id: number;
    author: number;
    dateCreated: number;
    sections: Array<Section>;
    comments: Array<CommentClient>;
    parents: Array<number>;

    constructor(id: number, author: number, dateCreated: number, sections: Array<Section>, comments: Array<CommentClient>, parents: Array<number>) {
        super(id, author, dateCreated, null, sections, comments);

        this.parents = parents;
    }
}
