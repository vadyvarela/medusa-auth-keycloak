import { ConfigModule } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
export declare function firebaseAuthRoutesBuilder({ domain, configModule, authPath, strategyName, expiresIn, }: {
    domain: 'admin' | 'store';
    configModule: ConfigModule;
    authPath: string;
    strategyName: string;
    expiresIn?: number;
}): Router;
//# sourceMappingURL=utils.d.ts.map