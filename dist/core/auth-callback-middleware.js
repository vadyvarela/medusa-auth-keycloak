"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSessionFactory = exports.signToken = exports.authCallbackMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Return the handler of the auth callback for an auth strategy. Once the auth is successful this callback
 * will be called.
 * @param successAction
 */
function authCallbackMiddleware(successAction) {
    return (req, res) => {
        successAction(req, res);
    };
}
exports.authCallbackMiddleware = authCallbackMiddleware;
function signToken(domain, configModule, user, expiresIn) {
    if (domain === 'admin') {
        return jsonwebtoken_1.default.sign({ user_id: user.id, domain: 'admin' }, configModule.projectConfig.jwt_secret, {
            expiresIn: expiresIn !== null && expiresIn !== void 0 ? expiresIn : '24h',
        });
    }
    else {
        return jsonwebtoken_1.default.sign({ customer_id: user.id, domain: 'store' }, configModule.projectConfig.jwt_secret, {
            expiresIn: expiresIn !== null && expiresIn !== void 0 ? expiresIn : '30d',
        });
    }
}
exports.signToken = signToken;
function authenticateSessionFactory(domain) {
    return (req, res) => {
        const sessionKey = domain === 'admin' ? 'user_id' : 'customer_id';
        req.session[sessionKey] = req.user.id;
    };
}
exports.authenticateSessionFactory = authenticateSessionFactory;
//# sourceMappingURL=auth-callback-middleware.js.map