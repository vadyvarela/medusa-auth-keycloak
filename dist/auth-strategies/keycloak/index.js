"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("./admin");
const store_1 = require("./store");
__exportStar(require("./types"), exports);
__exportStar(require("./admin"), exports);
__exportStar(require("./store"), exports);
exports.default = {
    load: (container, configModule, options) => {
        var _a, _b;
        if ((_a = options.keycloak) === null || _a === void 0 ? void 0 : _a.admin) {
            new admin_1.KeycloakAdminStrategy(container, configModule, options.keycloak, options.strict);
        }
        if ((_b = options.keycloak) === null || _b === void 0 ? void 0 : _b.store) {
            new store_1.KeycloakStoreStrategy(container, configModule, options.keycloak, options.strict);
        }
    },
    getRouter: (configModule, options) => {
        var _a, _b;
        const routers = [];
        if ((_a = options.keycloak) === null || _a === void 0 ? void 0 : _a.admin) {
            routers.push((0, admin_1.getKeycloakAdminAuthRouter)(options.keycloak, configModule));
        }
        if ((_b = options.keycloak) === null || _b === void 0 ? void 0 : _b.store) {
            routers.push((0, store_1.getKeycloakStoreAuthRouter)(options.keycloak, configModule));
        }
        return routers;
    },
};
//# sourceMappingURL=index.js.map