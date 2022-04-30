"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Section = void 0;
class Section {
    constructor(type, content) {
        if (type == "Text") {
            this.type = "Text";
        }
        else if (type == "Code") {
            this.type = "Code";
        }
        else {
            this.type = "Text";
        }
        this.content = content;
    }
}
exports.Section = Section;
//# sourceMappingURL=Section.js.map