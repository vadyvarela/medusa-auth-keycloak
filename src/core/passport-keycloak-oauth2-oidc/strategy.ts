var OAuth2Strategy = require('passport-oauth2')

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

class Strategy extends OAuth2Strategy {
  options: KeycloakOptions;
  realm: string;
  _userProfileURL: string;
  name: string;

  constructor(options: KeycloakOptions, verify: VerifyCallback) {
    options = options || {} as any;
    options.realm = options.realm || 'master';

    // set publicClient to `true` by default
    if (options.publicClient !== 'false') {
      options.publicClient = 'true';
    }

    // set sslRequired to `external` by default
    if (options.sslRequired !== 'all' && options.sslRequired !== 'none') {
      options.sslRequired = 'external';
    }

    // encode realm
    options.realm = encodeURIComponent(options.realm);

    if (!options.authServerURL) {
      throw new Error('Keycloak authServerURL is required.');
    }

    if (!options.callbackURL) {
      throw new Error('Keycloak callbackURL is required.');
    }

    if (!options.clientSecret && options.publicClient === 'false') {
      throw new Error('Keycloak clientSecret is required.');
    }

    const encodeRealm = encodeURIComponent(options.realm);

    options.authorizationURL = `${options.authServerURL}/realms/${options.realm}/protocol/openid-connect/auth`;
    options.tokenURL = `${options.authServerURL}/realms/${options.realm}/protocol/openid-connect/token`;

    super(options, verify);

    this.options = options;
    this.realm = options.realm;
    this.name = 'keycloak';
    this._userProfileURL = `${options.authServerURL}/realms/${options.realm}/protocol/openid-connect/userinfo`;
  }

  userProfile(accessToken: string, done: (err: any, profile?: KeycloakProfile) => void) {
    const self = this;
    let json;

    try {
      json = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
    } catch (ex) {
      return done(new Error('Failed to parse access token'));
    }

    const profile: KeycloakProfile = { realm: self.options.realm, provider: 'keycloak' } as any;
    profile.id = json.sub;
    profile.username = json.preferred_username;
    profile.email = json.email || '';
    profile.name = json.name || '';
    profile.given_name = json.given_name || '';
    profile.family_name = json.family_name || '';
    profile.email_verified = json.email_verified || '';
    profile.roles = json.realm_access.roles || '';

    // profile._raw = body;
    profile._json = json;

    done(null, profile);
  }
}

export = Strategy;
