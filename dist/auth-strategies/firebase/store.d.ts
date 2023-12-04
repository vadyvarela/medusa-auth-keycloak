import { Router } from 'express';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Strategy as FirebaseStrategy } from 'passport-firebase-jwt';
import { FirebaseAuthOptions } from './types';
import { AuthOptions } from '../../types';
declare const FirebaseStoreStrategy_base: new (...args: any[]) => FirebaseStrategy;
export declare class FirebaseStoreStrategy extends FirebaseStoreStrategy_base {
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
 * Return the router that hold the firebase store authentication routes
 * @param firebase
 * @param configModule
 */
export declare function getFirebaseStoreAuthRouter(firebase: FirebaseAuthOptions, configModule: ConfigModule): Router;
export {};
//# sourceMappingURL=store.d.ts.map