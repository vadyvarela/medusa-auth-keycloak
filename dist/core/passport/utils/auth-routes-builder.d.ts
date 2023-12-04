import { Router } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
type PassportAuthenticateMiddlewareOptions = {
    [key: string]: unknown;
    scope?: string | string[];
};
type PassportCallbackAuthenticateMiddlewareOptions = {
    [key: string]: unknown;
    failureRedirect: string;
};
/**
 * Build and return a router including the different route and configuration for a passport strategy
 * @param domain
 * @param configModule
 * @param authPath The path used to start the auth process e.g /admin/auth/google
 * @param authCallbackPath The pass used as the callback handler
 * @param strategyName The name use the define the strategy
 * @param passportAuthenticateMiddlewareOptions The options apply to the passport strategy on the auth path
 * @param passportCallbackAuthenticateMiddlewareOptions The options apply to the passport strategy on the callback auth path
 * @param expiresIn
 * @param successRedirect
 */
export declare function passportAuthRoutesBuilder({ domain, configModule, authPath, strategyName, passportAuthenticateMiddlewareOptions, passportCallbackAuthenticateMiddlewareOptions, successRedirect, authCallbackPath, expiresIn, }: {
    domain: 'admin' | 'store';
    configModule: ConfigModule;
    authPath: string;
    strategyName: string;
    passportAuthenticateMiddlewareOptions: PassportAuthenticateMiddlewareOptions;
    passportCallbackAuthenticateMiddlewareOptions: PassportCallbackAuthenticateMiddlewareOptions;
    successRedirect: string;
    authCallbackPath: string;
    expiresIn?: number;
}): Router;
export {};
//# sourceMappingURL=auth-routes-builder.d.ts.map