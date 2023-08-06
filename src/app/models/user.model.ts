export class User {
    static fromFirebase({ email, uuid, name }: any) {
        return new User(uuid, name, email)
    }
    constructor(
        public uuid: string,
        public name: string,
        public email: string
    ) {

    }
}