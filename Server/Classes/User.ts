import { removeArrayItem } from "../Functions/Util";

import bcrypt from 'bcrypt';
const saltRounds = 10;

import { v4 as uuidv4 } from 'uuid';

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
    
    constructor(id: number, username: string, email: string, password: string, firstName: string, lastName: string, birthDate: number) {
        this.id = id;
        this.username = username;
        this.email = email;

        this.hashPassword();

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
        return bcrypt.compareSync(password, this.password);
    }

    public setNewAuthKey(): string {
        this.authKey = uuidv4();
        return this.authKey;
    }

    public hashPassword() {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(this.password, salt);
        this.password = hash;
    }

    //#endregion
}