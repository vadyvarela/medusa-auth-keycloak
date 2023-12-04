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
const linkedin_1 = require("../linkedin");
__exportStar(require("./types"), exports);
__exportStar(require("./admin"), exports);
__exportStar(require("./store"), exports);
exports.default = {
    load: (container, configModule, options) => {
        var _a, _b;
        if ((_a = options.linkedin) === null || _a === void 0 ? void 0 : _a.admin) {
            new linkedin_1.LinkedinAdminStrategy(container, configModule, options.linkedin, options.strict);
        }
        if ((_b = options.linkedin) === null || _b === void 0 ? void 0 : _b.store) {
            new linkedin_1.LinkedinStoreStrategy(container, configModule, options.linkedin, options.strict);
        }
    },
    getRouter: (configModule, options) => {
        var _a, _b;
        const routers = [];
        if ((_a = options.linkedin) === null || _a === void 0 ? void 0 : _a.admin) {
            routers.push((0, linkedin_1.getLinkedinAdminAuthRouter)(options.linkedin, configModule));
        }
        if ((_b = options.linkedin) === null || _b === void 0 ? void 0 : _b.store) {
            routers.push((0, linkedin_1.getLinkedinStoreAuthRouter)(options.linkedin, configModule));
        }
        return routers;
    },
};
//# sourceMappingURL=index.js.map