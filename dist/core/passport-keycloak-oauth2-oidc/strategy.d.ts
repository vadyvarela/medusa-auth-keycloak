declare var OAuth2Strategy: any;
interface KeycloakOptions {
    authorizationURL: string;
    tokenURL: string;
    realm?: string;
    authServerURL: string;
    publicClient?: string;
    clientID: string;
    clientSecret?: string;
    callbackURL: string;
    sslRequired?: string;
}
interface KeycloakProfile {
    realm: string;
    provider: string;
    id: string;
    username: string;
    email: string;
    name: string;
    given_name: string;
    family_name: string;
    email_verified: string;
    roles: string;
    _json: any;
}
interface VerifyCallback {
    (accessToken: string, refreshToken: string, profile: KeycloakProfile, done: (err: any, user?: any) => void): void;
}
declare class Strategy extends OAuth2Strategy {
    options: KeycloakOptions;
    realm: string;
    _userProfileURL: string;
    name: string;
    constructor(options: KeycloakOptions, verify: VerifyCallback);
    userProfile(accessToken: string, done: (err: any, profile?: KeycloakProfile) => void): void;
}
export = Strategy;
//# sourceMappingURL=strategy.d.ts.map