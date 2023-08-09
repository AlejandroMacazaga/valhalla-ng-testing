export class RegisterUser {
    constructor(
        public email: string,
        public password: string,
        public confirmedPassword: string,
        public username: string,
    ) {}
}