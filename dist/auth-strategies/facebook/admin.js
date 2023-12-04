"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacebookAdminAuthRouter = exports.FacebookAdminStrategy = void 0;
const passport_facebook_1 = require("passport-facebook");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
class FacebookAdminStrategy extends (0, Strategy_1.PassportStrategy)(passport_facebook_1.Strategy, types_1.FACEBOOK_ADMIN_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            clientID: strategyOptions.clientID,
            clientSecret: strategyOptions.clientSecret,
            callbackURL: strategyOptions.admin.callbackUrl,
            passReqToCallback: true,
            profileFields: ['id', 'displayName', 'email', 'gender', 'name'],
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
            strategyErrorIdentifier: 'facebook',
            strict: this.strict,
        });
    }
}
exports.FacebookAdminStrategy = FacebookAdminStrategy;
/**
 * Return the router that hold the facebook admin authentication routes
 * @param facebook
 * @param configModule
 */
function getFacebookAdminAuthRouter(facebook, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = facebook.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/facebook',
        authCallbackPath: (_b = facebook.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/facebook/cb',
        successRedirect: facebook.admin.successRedirect,
        strategyName: types_1.FACEBOOK_ADMIN_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: ['email'],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: facebook.admin.failureRedirect,
        },
        expiresIn: facebook.admin.expiresIn,
    });
}
exports.getFacebookAdminAuthRouter = getFacebookAdminAuthRouter;
//# sourceMappingURL=admin.js.map