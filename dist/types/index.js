"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyNames = exports.TWENTY_FOUR_HOURS_IN_MS = exports.EMAIL_VERIFIED_KEY = exports.AUTH_PROVIDER_KEY = exports.CUSTOMER_METADATA_KEY = void 0;
const firebase_1 = require("../auth-strategies/firebase");
const google_1 = require("../auth-strategies/google");
const facebook_1 = require("../auth-strategies/facebook");
const linkedin_1 = require("../auth-strategies/linkedin");
const auth0_1 = require("../auth-strategies/auth0");
const azure_oidc_1 = require("../auth-strategies/azure-oidc");
const keycloak_1 = require("../auth-strategies/keycloak");
exports.CUSTOMER_METADATA_KEY = 'useSocialAuth';
exports.AUTH_PROVIDER_KEY = 'authProvider';
exports.EMAIL_VERIFIED_KEY = 'emailVerified';
exports.TWENTY_FOUR_HOURS_IN_MS = 24 * 60 * 60 * 1000;
exports.strategyNames = {
    auth0: {
        admin: auth0_1.AUTH0_ADMIN_STRATEGY_NAME,
        store: auth0_1.AUTH0_STORE_STRATEGY_NAME,
    },
    facebook: {
        admin: facebook_1.FACEBOOK_ADMIN_STRATEGY_NAME,
        store: facebook_1.FACEBOOK_STORE_STRATEGY_NAME,
    },
    google: {
        admin: google_1.GOOGLE_ADMIN_STRATEGY_NAME,
        store: google_1.GOOGLE_STORE_STRATEGY_NAME,
    },
    linkedin: {
        admin: linkedin_1.LINKEDIN_ADMIN_STRATEGY_NAME,
        store: linkedin_1.LINKEDIN_STORE_STRATEGY_NAME,
    },
    firebase: {
        admin: firebase_1.FIREBASE_ADMIN_STRATEGY_NAME,
        store: firebase_1.FIREBASE_STORE_STRATEGY_NAME,
    },
    azure_oidc: {
        admin: azure_oidc_1.AZURE_ADMIN_STRATEGY_NAME,
        store: azure_oidc_1.AZURE_STORE_STRATEGY_NAME,
    },
    keycloak: {
        admin: keycloak_1.KEYCLOAK_ADMIN_STRATEGY_NAME,
        store: keycloak_1.KEYCLOAK_STORE_STRATEGY_NAME,
    }
};
//# sourceMappingURL=index.js.map