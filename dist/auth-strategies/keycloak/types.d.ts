import { MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { AuthOptions } from '../../types';
export declare const KEYCLOAK_ADMIN_STRATEGY_NAME = "keycloak.admin.medusa-auth-plugin";
export declare const KEYCLOAK_STORE_STRATEGY_NAME = "keycloak.admin.medusa-auth-plugin";
export type Profile = {
    emails: {
        value: string;
    }[];
    givenName?: string;
    familyName?: string;
};
export type KeycloakAuthOptions = {
    clientID: string;
    realm: string;
    publicClient: string;
    clientSecret: string;
    sslRequired: string;
    scope: string;
    authServerURL: string;
    admin?: {
        callbackUrl: string;
        successRedirect: string;
        failureRedirect: string;
        /**
         * Default /admin/auth/keycloak
         */
        authPath?: string;
        /**
         * Default /admin/auth/keycloak/cb
         */
        authCallbackPath?: string;
        /**
         * The default verify callback function will be used if this configuration is not specified
         */
        verifyCallback?: (container: MedusaContainer, accessToken: string, refreshToken: string, profile: Profile, strict?: AuthOptions['strict']) => Promise<null | {
            id: string;
        } | never>;
        expiresIn?: number;
    };
    store?: {
        callbackUrl: string;
        successRedirect: string;
        failureRedirect: string;
        /**
         * Default /admin/auth/keycloak
         */
        authPath?: string;
        /**
         * Default /admin/auth/keycloak/cb
         */
        authCallbackPath?: string;
        /**
         * The default verify callback function will be used if this configuration is not specified
         */
        verifyCallback?: (container: MedusaContainer, req: Request, accessToken: string, refreshToken: string, profile: Profile, strict?: AuthOptions['strict']) => Promise<null | {
            id: string;
        } | never>;
        expiresIn?: number;
    };
};
//# sourceMappingURL=types.d.ts.map