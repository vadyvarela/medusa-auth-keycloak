import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { LinkedinAuthOptions, Profile } from './types';
import { AuthOptions } from '../../types';
declare const LinkedinAdminStrategy_base: new (...args: any[]) => any;
export declare class LinkedinAdminStrategy extends LinkedinAdminStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: LinkedinAuthOptions;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: LinkedinAuthOptions, strict?: AuthOptions['strict']);
    validate(req: Request, accessToken: string, refreshToken: string, profile: Profile): Promise<null | {
        id: string;
    }>;
}
/**
 * Return the router that hold the linkedin admin authentication routes
 * @param linkedin
 * @param configModule
 */
export declare function getLinkedinAdminAuthRouter(linkedin: LinkedinAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=admin.d.ts.map