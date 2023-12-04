import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { AzureAuthOptions } from './types';
import { AuthOptions } from '../../types';
declare const AzureAdminStrategy_base: new (...args: any[]) => any;
export declare class AzureAdminStrategy extends AzureAdminStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: AzureAuthOptions;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: AzureAuthOptions, strict?: AuthOptions['strict']);
    validate(req: Request, profile: any): Promise<null | {
        id: string;
    }>;
}
/**
 * Return the router that hold the azure admin authentication routes
 * @param azure
 * @param configModule
 */
export declare function getAzureAdminAuthRouter(azure: AzureAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=admin.d.ts.map