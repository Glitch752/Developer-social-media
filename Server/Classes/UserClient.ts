export class UserClient {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: number;

    authKey: string;
    
    constructor(id: number, username: string, email: string, firstName: string, lastName: string, birthDate: number, authKey: string) {
        this.id = id;
        this.username = username;
        this.email = email;

        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;

        this.authKey = authKey;
    }
}