const bcrypt = require('bcrypt');

import { removeArrayItem } from "../Functions/Util";
import { UserClient } from "./UserClient";

import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: number;
    posts: Array<number>;

    authKey: string;
    
    constructor(id: number, username: string, email: string, password: string, firstName: string, lastName: string, birthDate: number, alreadyHashed: boolean = false) {
        this.id = id;
        this.username = username;
        this.email = email;

        if (alreadyHashed) this.password = password;
        else this.hashPassword(password);

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;

        this.posts = new Array<number>();
    }

    public addPost(post: number): void {
        this.posts.push(post);
    }

    public removePost(post: number): void {
        removeArrayItem(this.posts, post);
    }

    //#region Authentication and Password Management

    public checkPassword(password: string): boolean {
        console.log(bcrypt.compareSync(password, this.password));

        return bcrypt.compareSync(password, this.password);
    }

    public hashPassword(password: string) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        this.password = hash;
    }

    public setNewAuthKey(): string {
        this.authKey = uuidv4();
        return this.authKey;
    }

    public toClient(): UserClient {
        return new UserClient(this.id, this.username, this.email, this.firstName, this.lastName, this.birthDate, this.authKey);
    }

    //#endregion
}