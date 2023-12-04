import { Strategy as FirebaseStrategy } from 'passport-firebase-jwt';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { FirebaseAuthOptions } from './types';
import { AuthOptions } from '../../types';
declare const FirebaseAdminStrategy_base: new (...args: any[]) => FirebaseStrategy;
export declare class FirebaseAdminStrategy extends FirebaseAdminStrategy_base {
    protected readonly container: MedusaContainer;
    protected readonly configModule: ConfigModule;
    protected readonly strategyOptions: FirebaseAuthOptions;
    protected readonly strict?: AuthOptions['strict'];
    constructor(container: MedusaContainer, configModule: ConfigModule, strategyOptions: FirebaseAuthOptions, strict?: AuthOptions['strict']);
    validate(token: string): Promise<null | {
        id: string;
    }>;
}
/**
 * Return the router that hold the firebase admin authentication routes
 * @param firebase
 * @param configModule
 */
export declare function getFirebaseAdminAuthRouter(firebase: FirebaseAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=admin.d.ts.map