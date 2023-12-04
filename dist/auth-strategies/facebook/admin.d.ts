import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { FacebookAuthOptions, Profile } from './types';
import { AuthOptions } from '../../types';
declare const FacebookAdminStrategy_base: new (...args: any[]) => any;
export declare class FacebookAdminStrategy extends FacebookAdminStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: FacebookAuthOptions;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: FacebookAuthOptions, strict?: AuthOptions['strict']);
    validate(req: Request, accessToken: string, refreshToken: string, profile: Profile): Promise<null | {
        id: string;
    }>;
}
/**
 * Return the router that hold the facebook admin authentication routes
 * @param facebook
 * @param configModule
 */
export declare function getFacebookAdminAuthRouter(facebook: FacebookAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=admin.d.ts.map