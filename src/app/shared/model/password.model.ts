
export class PasswordRequest {
    constructor(
        public newPassword?: string,
        public confirmPassword?: string,
        public currentPassword?: string

    ) {}
}
