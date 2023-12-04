"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("@medusajs/medusa/dist/loaders/config"));
const google_1 = __importDefault(require("../auth-strategies/google"));
const facebook_1 = __importDefault(require("../auth-strategies/facebook"));
const linkedin_1 = __importDefault(require("../auth-strategies/linkedin"));
const firebase_1 = __importDefault(require("../auth-strategies/firebase"));
const auth0_1 = __importDefault(require("../auth-strategies/auth0"));
const azure_oidc_1 = __importDefault(require("../auth-strategies/azure-oidc"));
const keycloak_1 = __importDefault(require("../auth-strategies/keycloak"));
function default_1(rootDirectory, pluginOptions) {
    const configModule = (0, config_1.default)(rootDirectory);
    return loadRouters(configModule, pluginOptions);
}
exports.default = default_1;
function loadRouters(configModule, options) {
    const routers = [];
    routers.push(...google_1.default.getRouter(configModule, options));
    routers.push(...facebook_1.default.getRouter(configModule, options));
    routers.push(...linkedin_1.default.getRouter(configModule, options));
    routers.push(...firebase_1.default.getRouter(configModule, options));
    routers.push(...auth0_1.default.getRouter(configModule, options));
    routers.push(...azure_oidc_1.default.getRouter(configModule, options));
    routers.push(...keycloak_1.default.getRouter(configModule, options));
    return routers;
}
//# sourceMappingURL=index.js.map