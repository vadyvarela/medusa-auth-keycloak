"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeycloakStoreAuthRouter = exports.KeycloakStoreStrategy = void 0;
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
const passport_keycloak_oauth2_oidc_1 = require("../../core/passport-keycloak-oauth2-oidc");
class KeycloakStoreStrategy extends (0, Strategy_1.PassportStrategy)(passport_keycloak_oauth2_oidc_1.KeyCloakStrategy, types_1.KEYCLOAK_STORE_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            clientID: strategyOptions.clientID,
            realm: strategyOptions.realm,
            publicClient: strategyOptions.publicClient,
            clientSecret: strategyOptions.clientSecret,
            sslRequired: strategyOptions.sslRequired,
            scope: strategyOptions.scope,
            authServerURL: strategyOptions.authServerURL,
            callbackURL: strategyOptions.store.callbackUrl,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(accessToken, refreshToken, profile) {
        if (this.strategyOptions.store.verifyCallback) {
            return await this.strategyOptions.store.verifyCallback(this.container, accessToken, refreshToken, profile, this.strict);
        }
        return await (0, validate_callback_1.validateStoreCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'keycloak',
            strict: this.strict,
        });
    }
}
exports.KeycloakStoreStrategy = KeycloakStoreStrategy;
/**
 * Return the router that hold the keycloak store authentication routes
 * @param keycloak
 * @param configModule
 */
function getKeycloakStoreAuthRouter(keycloak, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = keycloak.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/keycloak',
        authCallbackPath: (_b = keycloak.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/keycloak/cb',
        successRedirect: keycloak.store.successRedirect,
        strategyName: types_1.KEYCLOAK_STORE_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: ["profile"],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: keycloak.store.failureRedirect,
        },
        expiresIn: keycloak.store.expiresIn,
    });
}
exports.getKeycloakStoreAuthRouter = getKeycloakStoreAuthRouter;
//# sourceMappingURL=store.js.map