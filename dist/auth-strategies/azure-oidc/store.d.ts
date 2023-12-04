import { Router } from 'express';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { AzureAuthOptions } from './types';
import { AuthOptions } from '../../types';
declare const AzureStoreStrategy_base: new (...args: any[]) => any;
export declare class AzureStoreStrategy extends AzureStoreStrategy_base {
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
 * Return the router that hold the azure store authentication routes
 * @param azure
 * @param configModule
 */
export declare function getAzureStoreAuthRouter(azure: AzureAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=store.d.ts.map