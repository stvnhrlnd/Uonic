/**
 * Represents an external login provider.
 *
 * @export
 * @class ExternalLoginViewModel
 */
export class ExternalLoginViewModel {
    name: string;
    url: string;
    state: string;
}

/**
 * Represents member management information.
 *
 * @export
 * @class ManageInfoViewModel
 */
export class ManageInfoViewModel {
    localLoginProvider: string;
    email: string;
    logins: Array<UserLoginInfoViewModel>;
    externalLoginProviders: Array<ExternalLoginViewModel>;
}

/**
 * Represents basic member information.
 *
 * @export
 * @class UserInfoViewModel
 */
export class UserInfoViewModel {
    email: string;
    hasRegistered: boolean;
    loginProvider: string;
}

/**
 * Represents a member's login provider.
 *
 * @export
 * @class UserLoginInfoViewModel
 */
export class UserLoginInfoViewModel {
    loginProvider: string;
    providerKey: string;
}
