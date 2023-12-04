"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_1 = __importDefault(require("../auth-strategies/google"));
const facebook_1 = __importDefault(require("../auth-strategies/facebook"));
const linkedin_1 = __importDefault(require("../auth-strategies/linkedin"));
const firebase_1 = __importDefault(require("../auth-strategies/firebase"));
const auth0_1 = __importDefault(require("../auth-strategies/auth0"));
const azure_oidc_1 = __importDefault(require("../auth-strategies/azure-oidc"));
const keycloak_1 = __importDefault(require("../auth-strategies/keycloak"));
async function authStrategiesLoader(container, authOptions) {
    const configModule = container.resolve('configModule');
    google_1.default.load(container, configModule, authOptions);
    facebook_1.default.load(container, configModule, authOptions);
    linkedin_1.default.load(container, configModule, authOptions);
    firebase_1.default.load(container, configModule, authOptions);
    auth0_1.default.load(container, configModule, authOptions);
    azure_oidc_1.default.load(container, configModule, authOptions);
    keycloak_1.default.load(container, configModule, authOptions);
}
exports.default = authStrategiesLoader;
//# sourceMappingURL=index.js.map