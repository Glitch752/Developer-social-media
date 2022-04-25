"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArrayItem = void 0;
function removeArrayItem(array, value) {
    var i = 0;
    while (i < array.length) {
        if (array[i] === value) {
            array.splice(i, 1);
        }
        else {
            ++i;
        }
    }
    return array;
}
exports.removeArrayItem = removeArrayItem;
//# sourceMappingURL=Util.js.map