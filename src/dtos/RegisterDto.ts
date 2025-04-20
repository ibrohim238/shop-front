export class RegisterDto {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly passwordConfirmation: string,
    ) {}

    public toApi() {
        return {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
        };
    }
}
