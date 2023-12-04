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
__exportStar(require("./admin"), exports);
__exportStar(require("./store"), exports);
__exportStar(require("./types"), exports);
exports.default = {
    load: (container, configModule, options) => {
        var _a, _b;
        if ((_a = options.auth0) === null || _a === void 0 ? void 0 : _a.admin) {
            new admin_1.Auth0AdminStrategy(container, configModule, options.auth0, options.strict);
        }
        if ((_b = options.auth0) === null || _b === void 0 ? void 0 : _b.store) {
            new store_1.Auth0StoreStrategy(container, configModule, options.auth0, options.strict);
        }
    },
    getRouter: (configModule, options) => {
        var _a, _b;
        const routers = [];
        if ((_a = options.auth0) === null || _a === void 0 ? void 0 : _a.admin) {
            routers.push((0, admin_1.getAuth0AdminAuthRouter)(options.auth0, configModule));
        }
        if ((_b = options.auth0) === null || _b === void 0 ? void 0 : _b.store) {
            routers.push((0, store_1.getAuth0StoreAuthRouter)(options.auth0, configModule));
        }
        return routers;
    },
};
//# sourceMappingURL=index.js.map