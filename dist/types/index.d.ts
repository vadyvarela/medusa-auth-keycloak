import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { FirebaseAuthOptions } from '../auth-strategies/firebase';
import { GoogleAuthOptions } from '../auth-strategies/google';
import { FacebookAuthOptions } from '../auth-strategies/facebook';
import { LinkedinAuthOptions } from '../auth-strategies/linkedin';
import { Auth0Options } from '../auth-strategies/auth0';
import { AzureAuthOptions } from '../auth-strategies/azure-oidc';
import { KeycloakAuthOptions } from "../auth-strategies/keycloak";
export declare const CUSTOMER_METADATA_KEY = "useSocialAuth";
export declare const AUTH_PROVIDER_KEY = "authProvider";
export declare const EMAIL_VERIFIED_KEY = "emailVerified";
export declare const TWENTY_FOUR_HOURS_IN_MS: number;
export type StrategyExport = {
    load: (container: MedusaContainer, configModule: ConfigModule, options?: unknown) => void;
    getRouter?: (configModule: ConfigModule, options: AuthOptions) => Router[];
};
/**
 * The options to set in the plugin configuration options property in the medusa-config.js file.
 */
export type AuthOptions = ProviderOptions & {
    /**
     * When set to admin | store | all,  will only allow the user to authenticate using the provider
     * that has been used to create the account on the domain that strict is set to.
     *
     * @default 'all'
     */
    strict?: 'admin' | 'store' | 'all' | 'none';
};
export type ProviderOptions = {
    google?: GoogleAuthOptions;
    facebook?: FacebookAuthOptions;
    linkedin?: LinkedinAuthOptions;
    firebase?: FirebaseAuthOptions;
    auth0?: Auth0Options;
    azure_oidc?: AzureAuthOptions;
    keycloak?: KeycloakAuthOptions;
};
export type StrategyErrorIdentifierType = keyof ProviderOptions;
export type StrategyNames = {
    [key in StrategyErrorIdentifierType]: {
        admin: string;
        store?: string;
    };
};
export declare const strategyNames: StrategyNames;
//# sourceMappingURL=index.d.ts.map