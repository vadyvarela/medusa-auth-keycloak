import { Request, Response } from 'express';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';
/**
 * Return the handler of the auth callback for an auth strategy. Once the auth is successful this callback
 * will be called.
 * @param successAction
 */
export declare function authCallbackMiddleware(successAction: (req: Request, res: Response) => void): (req: any, res: any) => void;
export declare function signToken(domain: 'admin' | 'store', configModule: ConfigModule, user: any, expiresIn?: number): string;
export declare function authenticateSessionFactory(domain: 'admin' | 'store'): (req: any, res: any) => void;
//# sourceMappingURL=auth-callback-middleware.d.ts.map