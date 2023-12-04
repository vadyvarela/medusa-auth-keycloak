"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleAdminAuthRouter = exports.GoogleAdminStrategy = void 0;
const passport_google_oauth2_1 = require("passport-google-oauth2");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
class GoogleAdminStrategy extends (0, Strategy_1.PassportStrategy)(passport_google_oauth2_1.Strategy, types_1.GOOGLE_ADMIN_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            clientID: strategyOptions.clientID,
            clientSecret: strategyOptions.clientSecret,
            callbackURL: strategyOptions.admin.callbackUrl,
            passReqToCallback: true,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(req, accessToken, refreshToken, profile) {
        if (this.strategyOptions.admin.verifyCallback) {
            return await this.strategyOptions.admin.verifyCallback(this.container, req, accessToken, refreshToken, profile, this.strict);
        }
        return await (0, validate_callback_1.validateAdminCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'google',
            strict: this.strict,
        });
    }
}
exports.GoogleAdminStrategy = GoogleAdminStrategy;
/**
 * Return the router that hold the google admin authentication routes
 * @param google
 * @param configModule
 */
function getGoogleAdminAuthRouter(google, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = google.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/google',
        authCallbackPath: (_b = google.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/google/cb',
        successRedirect: google.admin.successRedirect,
        strategyName: types_1.GOOGLE_ADMIN_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: google.admin.failureRedirect,
        },
        expiresIn: google.admin.expiresIn,
    });
}
exports.getGoogleAdminAuthRouter = getGoogleAdminAuthRouter;
//# sourceMappingURL=admin.js.map