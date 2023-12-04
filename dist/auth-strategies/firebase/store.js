"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirebaseStoreAuthRouter = exports.FirebaseStoreStrategy = void 0;
const passport_firebase_jwt_1 = require("passport-firebase-jwt");
const Strategy_1 = require("../../core/passport/Strategy");
const validate_callback_1 = require("../../core/validate-callback");
const types_1 = require("./types");
const utils_1 = require("./utils");
const firebase_admin_1 = require("firebase-admin");
class FirebaseStoreStrategy extends (0, Strategy_1.PassportStrategy)(passport_firebase_jwt_1.Strategy, types_1.FIREBASE_STORE_STRATEGY_NAME) {
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
        if (this.strategyOptions.store.verifyCallback) {
            return await this.strategyOptions.store.verifyCallback(this.container, decodedToken, this.strict);
        }
        const profile = { emails: [{ value: decodedToken.email }] };
        return await (0, validate_callback_1.validateStoreCallback)(profile, {
            container: this.container,
            strategyErrorIdentifier: 'firebase',
            strict: this.strict,
        });
    }
}
exports.FirebaseStoreStrategy = FirebaseStoreStrategy;
/**
 * Return the router that hold the firebase store authentication routes
 * @param firebase
 * @param configModule
 */
function getFirebaseStoreAuthRouter(firebase, configModule) {
    var _a;
    return (0, utils_1.firebaseAuthRoutesBuilder)({
        domain: 'store',
        configModule,
        authPath: (_a = firebase.store.authPath) !== null && _a !== void 0 ? _a : '/store/auth/firebase',
        strategyName: types_1.FIREBASE_STORE_STRATEGY_NAME,
        expiresIn: firebase.store.expiresIn,
    });
}
exports.getFirebaseStoreAuthRouter = getFirebaseStoreAuthRouter;
//# sourceMappingURL=store.js.map