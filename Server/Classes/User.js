"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Util_1 = require("../Functions/Util");
const bcrypt_1 = require("bcrypt");
const saltRounds = 10;
const uuid_1 = require("uuid");
class User {
    constructor(id, username, email, password, firstName, lastName, birthDate) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.hashPassword();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.posts = new Array();
    }
    addPost(post) {
        this.posts.push(post);
    }
    removePost(post) {
        (0, Util_1.removeArrayItem)(this.posts, post);
    }
    //#region Authentication and Password Management
    checkPassword(password) {
        return bcrypt_1.default.compareSync(password, this.password);
    }
    setNewAuthKey() {
        this.authKey = (0, uuid_1.v4)();
        return this.authKey;
    }
    hashPassword() {
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        const hash = bcrypt_1.default.hashSync(this.password, salt);
        this.password = hash;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map