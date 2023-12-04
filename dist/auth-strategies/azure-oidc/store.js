"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAzureStoreAuthRouter = exports.AzureStoreStrategy = void 0;
const passport_azure_ad_1 = require("passport-azure-ad");
const Strategy_1 = require("../../core/passport/Strategy");
const types_1 = require("./types");
const auth_routes_builder_1 = require("../../core/passport/utils/auth-routes-builder");
const validate_callback_1 = require("../../core/validate-callback");
class AzureStoreStrategy extends (0, Strategy_1.PassportStrategy)(passport_azure_ad_1.OIDCStrategy, types_1.AZURE_STORE_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        var _a, _b, _c, _d, _e;
        super({
            identityMetadata: strategyOptions.store.identityMetadata,
            clientID: strategyOptions.store.clientID,
            clientSecret: strategyOptions.store.clientSecret,
            responseType: (_a = strategyOptions.store.responseType) !== null && _a !== void 0 ? _a : types_1.ResponseType.Code,
            responseMode: (_b = strategyOptions.store.responseMode) !== null && _b !== void 0 ? _b : types_1.ResponseMode.Query,
            redirectUrl: strategyOptions.store.callbackUrl,
            allowHttpForRedirectUrl: (_c = strategyOptions.store.allowHttpForRedirectUrl) !== null && _c !== void 0 ? _c : false,
            validateIssuer: (_d = strategyOptions.store.validateIssuer) !== null && _d !== void 0 ? _d : true,
            isB2C: (_e = strategyOptions.store.isB2C) !== null && _e !== void 0 ? _e : false,
            issuer: strategyOptions.store.issuer,
            passReqToCallback: true,
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(req, profile) {
        var _a, _b;
        if (this.strategyOptions.store.verifyCallback) {
            return await this.strategyOptions.store.verifyCallback(this.container, req, profile, this.strict);
        }
        const authprofile = {
            emails: [{ value: profile === null || profile === void 0 ? void 0 : profile.upn }],
            name: { givenName: (_a = profile === null || profile === void 0 ? void 0 : profile.name) === null || _a === void 0 ? void 0 : _a.givenName, familyName: (_b = profile === null || profile === void 0 ? void 0 : profile.name) === null || _b === void 0 ? void 0 : _b.familyName },
        };
        return await (0, validate_callback_1.validateStoreCallback)(authprofile, {
            container: this.container,
            strategyErrorIdentifier: 'azure_oidc',
            strict: this.strict,
        });
    }
}
exports.AzureStoreStrategy = AzureStoreStrategy;
/**
 * Return the router that hold the azure store authentication routes
 * @param azure
 * @param configModule
 */
function getAzureStoreAuthRouter(azure, configModule) {
    var _a, _b, _c;
    return (0, auth_routes_builder_1.passportAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = azure.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/azure',
        authCallbackPath: (_b = azure.store.authCallbackPath) !== null && _b !== void 0 ? _b : '/store/auth/azure/cb',
        successRedirect: azure.store.successRedirect,
        strategyName: types_1.AZURE_STORE_STRATEGY_NAME,
        passportAuthenticateMiddlewareOptions: {
            scope: (_c = azure.store.scope) !== null && _c !== void 0 ? _c : [],
        },
        passportCallbackAuthenticateMiddlewareOptions: {
            failureRedirect: azure.store.failureRedirect,
        },
        expiresIn: azure.store.expiresIn,
    });
}
exports.getAzureStoreAuthRouter = getAzureStoreAuthRouter;
//# sourceMappingURL=store.js.map