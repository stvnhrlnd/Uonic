/**
 * Represents a change password request.
 *
 * @export
 * @class ChangePasswordBindingModel
 */
export class ChangePasswordBindingModel {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

/**
 * Represents a new member registration.
 *
 * @export
 * @class RegisterBindingModel
 */
export class RegisterBindingModel {
    email: string;
    password: string;
    confirmPassword: string;
}

/**
 * Represents a new member registration from an external login.
 *
 * @export
 * @class RegisterExternalBindingModel
 */
export class RegisterExternalBindingModel {
    email: string;
}
