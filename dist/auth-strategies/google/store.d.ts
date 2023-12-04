import { Router } from 'express';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { GoogleAuthOptions, Profile } from './types';
import { AuthOptions } from '../../types';
declare const GoogleStoreStrategy_base: new (...args: any[]) => any;
export declare class GoogleStoreStrategy extends GoogleStoreStrategy_base {
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
 * Return the router that hold the google store authentication routes
 * @param google
 * @param configModule
 */
export declare function getGoogleStoreAuthRouter(google: GoogleAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=store.d.ts.map