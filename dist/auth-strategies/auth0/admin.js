"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth0AdminAuthRouter = exports.Auth0AdminStrategy = void 0;
const passport_auth0_1 = require("passport-auth0");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
class Auth0AdminStrategy extends (0, Strategy_1.PassportStrategy)(passport_auth0_1.Strategy, types_1.AUTH0_ADMIN_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            domain: strategyOptions.auth0Domain,
            clientID: strategyOptions.clientID,
            clientSecret: strategyOptions.clientSecret,
            callbackURL: strategyOptions.admin.callbackUrl,
            passReqToCallback: true,
            state: true,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(req, accessToken, refreshToken, extraParams, profile) {
        if (this.strategyOptions.admin.verifyCallback) {
            const validateRes = await this.strategyOptions.admin.verifyCallback(this.container, req, accessToken, refreshToken, extraParams, profile, this.strict);
            return Object.assign(Object.assign({}, validateRes), { accessToken });
        }
        const validateRes = await (0, validate_callback_1.validateAdminCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'auth0',
            strict: this.strict,
        });
        return Object.assign(Object.assign({}, validateRes), { accessToken });
    }
}
exports.Auth0AdminStrategy = Auth0AdminStrategy;
/**
 * Return the router that holds the auth0 admin authentication routes
 * @param auth0
 * @param configModule
 */
function getAuth0AdminAuthRouter(auth0, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = auth0.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/auth0',
        authCallbackPath: (_b = auth0.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/auth0/cb',
        successRedirect: auth0.admin.successRedirect,
        strategyName: types_1.AUTH0_ADMIN_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: 'openid email profile',
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: auth0.admin.failureRedirect,
        },
        expiresIn: auth0.admin.expiresIn,
    });
}
exports.getAuth0AdminAuthRouter = getAuth0AdminAuthRouter;
//# sourceMappingURL=admin.js.map