export class Section {
    type: string;
    content: string;

    constructor(type: string, content: string) { 
        if (type == "Text") {
            this.type = "Text";
        } else if (type == "Code") {
            this.type = "Code";
        } else {
            this.type = "Text";
        }

        this.content = content;
    }
}