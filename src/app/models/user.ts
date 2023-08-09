export class User {
    constructor(
        public email: string,
        public password: string,
        public username?: string,
        public profilePic?: string,
        public id?: string,
        public validationCode?: string
    ) {}
}