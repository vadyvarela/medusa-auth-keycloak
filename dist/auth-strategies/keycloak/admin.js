"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeycloakAdminAuthRouter = exports.KeycloakAdminStrategy = void 0;
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
const passport_keycloak_oauth2_oidc_1 = require("../../core/passport-keycloak-oauth2-oidc");
class KeycloakAdminStrategy extends (0, Strategy_1.PassportStrategy)(passport_keycloak_oauth2_oidc_1.KeyCloakStrategy, types_1.KEYCLOAK_ADMIN_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            clientID: strategyOptions.clientID,
            realm: strategyOptions.realm,
            publicClient: strategyOptions.publicClient,
            clientSecret: strategyOptions.clientSecret,
            sslRequired: strategyOptions.sslRequired,
            scope: strategyOptions.scope,
            authServerURL: strategyOptions.authServerURL,
            callbackURL: strategyOptions.admin.callbackUrl,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(accessToken, refreshToken, profile) {
        if (this.strategyOptions.admin.verifyCallback) {
            return await this.strategyOptions.admin.verifyCallback(this.container, accessToken, refreshToken, profile, this.strict);
        }
        return await (0, validate_callback_1.validateAdminCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'keycloak',
            strict: this.strict,
        });
    }
}
exports.KeycloakAdminStrategy = KeycloakAdminStrategy;
/**
 * Return the router that hold the keycloak admin authentication routes
 * @param keycloak
 * @param configModule
 */
function getKeycloakAdminAuthRouter(keycloak, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = keycloak.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/keycloak',
        authCallbackPath: (_b = keycloak.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/keycloak/cb',
        successRedirect: keycloak.admin.successRedirect,
        strategyName: types_1.KEYCLOAK_ADMIN_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: ["profile"],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: keycloak.admin.failureRedirect,
        },
        expiresIn: keycloak.admin.expiresIn,
    });
}
exports.getKeycloakAdminAuthRouter = getKeycloakAdminAuthRouter;
//# sourceMappingURL=admin.js.map