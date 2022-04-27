"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = require('bcrypt');
const Util_1 = require("../Functions/Util");
const UserClient_1 = require("./UserClient");
const uuid_1 = require("uuid");
const saltRounds = 10;
class User {
    constructor(id, username, email, password, firstName, lastName, birthDate, alreadyHashed = false) {
        this.id = id;
        this.username = username;
        this.email = email;
        if (alreadyHashed)
            this.password = password;
        else
            this.hashPassword(password);
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
        console.log(bcrypt.compareSync(password, this.password));
        return bcrypt.compareSync(password, this.password);
    }
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        this.password = hash;
    }
    setNewAuthKey() {
        this.authKey = (0, uuid_1.v4)();
        return this.authKey;
    }
    toClient() {
        return new UserClient_1.UserClient(this.id, this.username, this.email, this.firstName, this.lastName, this.birthDate, this.authKey);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map