import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { KeycloakAuthOptions } from './types';
import { AuthOptions } from '../../types';
import { KeyCloakStrategy } from '../../core/passport-keycloak-oauth2-oidc';
declare const KeycloakStoreStrategy_base: new (...args: any[]) => KeyCloakStrategy;
export declare class KeycloakStoreStrategy extends KeycloakStoreStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: any;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: any, strict?: AuthOptions['strict']);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<null | {
        id: string;
    }>;
}
/**
 * Return the router that hold the keycloak store authentication routes
 * @param keycloak
 * @param configModule
 */
export declare function getKeycloakStoreAuthRouter(keycloak: KeycloakAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=store.d.ts.map