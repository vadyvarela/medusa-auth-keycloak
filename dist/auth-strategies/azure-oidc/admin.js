"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAzureAdminAuthRouter = exports.AzureAdminStrategy = void 0;
const passport_azure_ad_1 = require("passport-azure-ad");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
class AzureAdminStrategy extends (0, Strategy_1.PassportStrategy)(passport_azure_ad_1.OIDCStrategy, types_1.AZURE_ADMIN_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        var _a, _b, _c, _d, _e;
        super({
            identityMetadata: strategyOptions.admin.identityMetadata,
            clientID: strategyOptions.admin.clientID,
            clientSecret: strategyOptions.admin.clientSecret,
            responseType: (_a = strategyOptions.admin.responseType) !== null && _a !== void 0 ? _a : types_1.ResponseType.Code,
            responseMode: (_b = strategyOptions.admin.responseMode) !== null && _b !== void 0 ? _b : types_1.ResponseMode.Query,
            redirectUrl: strategyOptions.admin.callbackUrl,
            allowHttpForRedirectUrl: (_c = strategyOptions.admin.allowHttpForRedirectUrl) !== null && _c !== void 0 ? _c : false,
            validateIssuer: (_d = strategyOptions.admin.validateIssuer) !== null && _d !== void 0 ? _d : true,
            isB2C: (_e = strategyOptions.admin.isB2C) !== null && _e !== void 0 ? _e : false,
            issuer: strategyOptions.admin.issuer,
            passReqToCallback: true,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(req, profile) {
        var _a, _b;
        if (this.strategyOptions.admin.verifyCallback) {
            return await this.strategyOptions.admin.verifyCallback(this.container, req, profile, this.strict);
        }
        const authprofile = {
            emails: [{ value: profile === null || profile === void 0 ? void 0 : profile.upn }],
            name: { givenName: (_a = profile === null || profile === void 0 ? void 0 : profile.name) === null || _a === void 0 ? void 0 : _a.givenName, familyName: (_b = profile === null || profile === void 0 ? void 0 : profile.name) === null || _b === void 0 ? void 0 : _b.familyName },
        };
        return await (0, validate_callback_1.validateAdminCallback)(authprofile, {
            container: this.container,
            strategyErrorIdentifier: 'azure_oidc',
            strict: this.strict,
        });
    }
}
exports.AzureAdminStrategy = AzureAdminStrategy;
/**
 * Return the router that hold the azure admin authentication routes
 * @param azure
 * @param configModule
 */
function getAzureAdminAuthRouter(azure, configModule) {
    var _a, _b, _c;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = azure.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/azure',
        authCallbackPath: (_b = azure.admin.authCallbackPath) !== null && _b !== void 0 ? _b : '/admin/auth/azure/cb',
        successRedirect: azure.admin.successRedirect,
        strategyName: types_1.AZURE_ADMIN_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: (_c = azure.admin.scope) !== null && _c !== void 0 ? _c : [],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: azure.admin.failureRedirect,
        },
        expiresIn: azure.admin.expiresIn,
    });
}
exports.getAzureAdminAuthRouter = getAzureAdminAuthRouter;
//# sourceMappingURL=admin.js.map