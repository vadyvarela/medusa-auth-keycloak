"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAuthRoutesBuilder = void 0;
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const auth_callback_middleware_1 = require("../../core/auth-callback-middleware");
function firebaseCallbackMiddleware(domain, configModule, expiresIn) {
    return (req, res) => {
        console.log(req.query);
        if (req.query.returnAccessToken == 'true') {
            const token = (0, auth_callback_middleware_1.signToken)(domain, configModule, req.user, expiresIn);
            res.json({ access_token: token });
            return;
        }
        else {
            const authenticateSession = (0, auth_callback_middleware_1.authenticateSessionFactory)(domain);
            authenticateSession(req, res);
            res.status(200).json({ result: 'OK' });
        }
    };
}
function firebaseAuthRoutesBuilder({ domain, configModule, authPath, strategyName, expiresIn, }) {
    const router = (0, express_1.Router)();
    const corsOptions = {
        origin: domain === 'admin'
            ? configModule.projectConfig.admin_cors.split(',')
            : configModule.projectConfig.store_cors.split(','),
        credentials: true,
    };
    router.get(authPath, (0, cors_1.default)(corsOptions));
    /*necessary if you are using non medusajs client such as a pure axios call, axios initially requests options and then get*/
    router.options(authPath, (0, cors_1.default)(corsOptions));
    const callbackHandler = firebaseCallbackMiddleware(domain, configModule, expiresIn);
    router.get(authPath, passport_1.default.authenticate(strategyName, {
        session: false,
    }), callbackHandler);
    return router;
}
exports.firebaseAuthRoutesBuilder = firebaseAuthRoutesBuilder;
//# sourceMappingURL=utils.js.map