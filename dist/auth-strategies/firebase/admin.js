"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseAdminAuthRouter = exports.FirebaseAdminStrategy = void 0;
const passport_firebase_jwt_1 = require("passport-firebase-jwt");
const types_1 = require("./types");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const utils_1 = require("./utils");
const firebase_admin_1 = require("firebase-admin");
class FirebaseAdminStrategy extends (0, Strategy_1.PassportStrategy)(passport_firebase_jwt_1.Strategy, types_1.FIREBASE_ADMIN_STRATEGY_NAME) {
    constructor(container, configModule, strategyOptions, strict) {
        var _a;
        super({
            jwtFromRequest: (_a = strategyOptions.store.jwtFromRequest) !== null && _a !== void 0 ? _a : passport_firebase_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.container = container;
        this.configModule = configModule;
        this.strategyOptions = strategyOptions;
        this.strict = strict;
    }
    async validate(token) {
        const decodedToken = await (0, firebase_admin_1.auth)().verifyIdToken(token);
        if (this.strategyOptions.admin.verifyCallback) {
            return await this.strategyOptions.admin.verifyCallback(this.container, decodedToken, this.strict);
        }
        const profile = { emails: [{ value: decodedToken.email }] };
        return await (0, validate_callback_1.validateAdminCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'firebase',
            strict: this.strict,
        });
    }
}
exports.FirebaseAdminStrategy = FirebaseAdminStrategy;
/**
 * Return the router that hold the firebase admin authentication routes
 * @param firebase
 * @param configModule
 */
function getFirebaseAdminAuthRouter(firebase, configModule) {
    var _a;
    return (0, utils_1.firebaseAuthRoutesBuilder)({
        domain: 'admin',
        configModule,
        authPath: (_a = firebase.admin.authPath) !== null && _a !== void 0 ? _a : '/admin/auth/firebase',
        strategyName: types_1.FIREBASE_ADMIN_STRATEGY_NAME,
        expiresIn: firebase.admin.expiresIn,
    });
}
exports.getFirebaseAdminAuthRouter = getFirebaseAdminAuthRouter;
//# sourceMappingURL=admin.js.map