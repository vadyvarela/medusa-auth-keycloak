"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLinkedinStoreAuthRouter = exports.LinkedinStoreStrategy = void 0;
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const Strategy_1 = require("../../core/passport/Strategy");
const types_1 = require("./types");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
class LinkedinStoreStrategy extends (0, Strategy_1.PassportStrategy)(passport_linkedin_oauth2_1.Strategy, types_1.LINKEDIN_STORE_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        super({
            clientID: strategyOptions.clientID,
            clientSecret: strategyOptions.clientSecret,
            callbackURL: strategyOptions.store.callbackUrl,
            passReqToCallback: true,
            scope: ['r_emailaddress'],
            state: true,
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
            strategyErrorIdentifier: 'linkedin',
            strict: this.strict,
        });
    }
}
exports.LinkedinStoreStrategy = LinkedinStoreStrategy;
/**
 * Return the router that hold the linkedin store authentication routes
 * @param linkedin
 * @param configModule
 */
function getLinkedinStoreAuthRouter(linkedin, configModule) {
    var _a, _b;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = linkedin.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/linkedin',
        authCallbackPath: (_b = linkedin.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/linkedin/cb',
        successRedirect: linkedin.store.successRedirect,
        strategyName: types_1.LINKEDIN_STORE_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: [
                'https://www.linkedinapis.com/auth/userinfo.email',
                'https://www.linkedinapis.com/auth/userinfo.profile',
            ],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: linkedin.store.failureRedirect,
        },
        expiresIn: linkedin.store.expiresIn,
    });
}
exports.getLinkedinStoreAuthRouter = getLinkedinStoreAuthRouter;
//# sourceMappingURL=store.js.map