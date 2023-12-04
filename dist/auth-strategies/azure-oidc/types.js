"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseMode = exports.ResponseType = exports.AZURE_ADMIN_STRATEGY_NAME = exports.AZURE_STORE_STRATEGY_NAME = void 0;
exports.AZURE_STORE_STRATEGY_NAME = 'azure-oidc.store.medusa-auth-plugin';
exports.AZURE_ADMIN_STRATEGY_NAME = 'azure-oidc.admin.medusa-auth-plugin';
var ResponseType;
(function (ResponseType) {
    ResponseType["Code"] = "code";
    ResponseType["CodeIdToken"] = "code id_token";
    ResponseType["IdTokenCode"] = "id_token code";
    ResponseType["IdToken"] = "id_token";
})(ResponseType || (exports.ResponseType = ResponseType = {}));
var ResponseMode;
(function (ResponseMode) {
    ResponseMode["FormPost"] = "form_post";
    ResponseMode["Query"] = "query";
})(ResponseMode || (exports.ResponseMode = ResponseMode = {}));
//# sourceMappingURL=types.js.map