import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { GoogleAuthOptions, Profile } from './types';
import { AuthOptions } from '../../types';
declare const GoogleAdminStrategy_base: new (...args: any[]) => any;
export declare class GoogleAdminStrategy extends GoogleAdminStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: GoogleAuthOptions;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: GoogleAuthOptions, strict?: AuthOptions['strict']);
    validate(req: Request, accessToken: string, refreshToken: string, profile: Profile): Promise<null | {
        id: string;
    }>;
}
/**
 * Return the router that hold the google admin authentication routes
 * @param google
 * @param configModule
 */
export declare function getGoogleAdminAuthRouter(google: GoogleAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=admin.d.ts.map