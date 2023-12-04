"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuth0StoreAuthRouter = exports.Auth0StoreStrategy = void 0;
const passport_auth0_1 = require("passport-auth0");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
class Auth0StoreStrategy extends (0, Strategy_1.PassportStrategy)(passport_auth0_1.Strategy, types_1.AUTH0_STORE_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            domain: strategyOptions.auth0Domain,
            clientID: strategyOptions.clientID,
            clientSecret: strategyOptions.clientSecret,
            callbackURL: strategyOptions.store.callbackUrl,
            passReqToCallback: true,
            state: true,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(req, accessToken, refreshToken, extraParams, profile) {
        if (this.strategyOptions.store.verifyCallback) {
            const validateRes = await this.strategyOptions.store.verifyCallback(this.container, req, accessToken, refreshToken, extraParams, profile, this.strict);
            return Object.assign(Object.assign({}, validateRes), { accessToken });
        }
        const validateRes = await (0, validate_callback_1.validateStoreCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'auth0',
            strict: this.strict,
        });
        return Object.assign(Object.assign({}, validateRes), { accessToken });
    }
}
exports.Auth0StoreStrategy = Auth0StoreStrategy;
/**
 * Return the router that holds the auth0 store authentication routes
 * @param auth0
 * @param configModule
 */
function getAuth0StoreAuthRouter(auth0, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = auth0.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/auth0',
        authCallbackPath: (_b = auth0.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/auth0/cb',
        successRedirect: auth0.store.successRedirect,
        strategyName: types_1.AUTH0_STORE_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: 'openid email profile',
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: auth0.store.failureRedirect,
        },
        expiresIn: auth0.store.expiresIn,
    });
}
exports.getAuth0StoreAuthRouter = getAuth0StoreAuthRouter;
//# sourceMappingURL=store.js.map