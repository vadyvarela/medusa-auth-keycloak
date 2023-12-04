"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleStoreAuthRouter = exports.GoogleStoreStrategy = void 0;
const passport_google_oauth2_1 = require("passport-google-oauth2");
const Strategy_1 = require("../../core/passport/Strategy");
const types_1 = require("./types");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
const validate_callback_1 = require("../../core/validate-callback");
class GoogleStoreStrategy extends (0, Strategy_1.PassportStrategy)(passport_google_oauth2_1.Strategy, types_1.GOOGLE_STORE_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            clientID: strategyOptions.clientID,
            clientSecret: strategyOptions.clientSecret,
            callbackURL: strategyOptions.store.callbackUrl,
            passReqToCallback: true,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(req, accessToken, refreshToken, profile) {
        if (this.strategyOptions.store.verifyCallback) {
            return await this.strategyOptions.store.verifyCallback(this.container, req, accessToken, refreshToken, profile, this.strict);
        }
        return await (0, validate_callback_1.validateStoreCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'google',
            strict: this.strict,
        });
    }
}
exports.GoogleStoreStrategy = GoogleStoreStrategy;
/**
 * Return the router that hold the google store authentication routes
 * @param google
 * @param configModule
 */
function getGoogleStoreAuthRouter(google, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = google.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/google',
        authCallbackPath: (_b = google.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/google/cb',
        successRedirect: google.store.successRedirect,
        strategyName: types_1.GOOGLE_STORE_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: google.store.failureRedirect,
        },
        expiresIn: google.store.expiresIn,
    });
}
exports.getGoogleStoreAuthRouter = getGoogleStoreAuthRouter;
//# sourceMappingURL=store.js.map