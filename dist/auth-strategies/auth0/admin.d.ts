import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { Auth0Options, Profile, ExtraParams } from './types';
import { AuthOptions } from '../../types';
declare const Auth0AdminStrategy_base: new (...args: any[]) => any;
export declare class Auth0AdminStrategy extends Auth0AdminStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: Auth0Options;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: Auth0Options, strict?: AuthOptions['strict']);
    validate(req: Request, accessToken: string, refreshToken: string, extraParams: ExtraParams, profile: Profile): Promise<null | {
        id: string;
        accessToken: string;
    }>;
}
/**
 * Return the router that holds the auth0 admin authentication routes
 * @param auth0
 * @param configModule
 */
export declare function getAuth0AdminAuthRouter(auth0: Auth0Options, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=admin.d.ts.map