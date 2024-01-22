import { MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { AuthOptions, StrategyErrorIdentifierType } from '../types';
/**
 * Default validate callback used by an admin passport strategy
 *
 * @param profile
 * @param container
 * @param strategyErrorIdentifier
 * @param strict
 */
export declare function validateAdminCallback<T extends {
    [x: string]: any;
    emails?: {
        value: string;
    }[];
} = {
    emails?: {
        value: string;
    }[];
}>(profile: T, { container, strategyErrorIdentifier, strict, }: {
    container: MedusaContainer;
    strategyErrorIdentifier: StrategyErrorIdentifierType;
    strict?: AuthOptions['strict'];
}): Promise<{
    id: string;
} | never>;
/**
 * Default validate callback used by a store passport strategy
 *
 * @param profile
 * @param strategyErrorIdentifier It will be used to compose the error message in case of an error (e.g Google, Facebook)
 * @param container
 * @param strict
 */
export declare function validateStoreCallback<T extends {
    name?: {
        givenName?: string;
        familyName?: string;
    };
    givenName?: string;
    familyName?: string;
    _json?: {
        email_verified?: boolean;
    };
    email?: string;
} = {
    email?: string;
}>(profile: T, { container, strategyErrorIdentifier, strict, }: {
    container: MedusaContainer;
    strategyErrorIdentifier: StrategyErrorIdentifierType;
    strict?: AuthOptions['strict'];
}): Promise<{
    id: string;
} | never>;
//# sourceMappingURL=validate-callback.d.ts.map