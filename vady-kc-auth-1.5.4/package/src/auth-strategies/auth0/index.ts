import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { AuthOptions, StrategyExport } from '../../types';
import { Router } from 'express';
import { getAuth0AdminAuthRouter, Auth0AdminStrategy } from './admin';
import { getAuth0StoreAuthRouter, Auth0StoreStrategy } from './store';

export * from './admin';
export * from './store';
export * from './types';

export default {
	load: (container: MedusaContainer, configModule: ConfigModule, options: AuthOptions): void => {
		if (options.auth0?.admin) {
			new Auth0AdminStrategy(container, configModule, options.auth0, options.strict);
		}

		if (options.auth0?.store) {
			new Auth0StoreStrategy(container, configModule, options.auth0, options.strict);
		}
	},
	getRouter: (configModule: ConfigModule, options: AuthOptions): Router[] => {
		const routers = [];

		if (options.auth0?.admin) {
			routers.push(getAuth0AdminAuthRouter(options.auth0, configModule));
		}

		if (options.auth0?.store) {
			routers.push(getAuth0StoreAuthRouter(options.auth0, configModule));
		}

		return routers;
	},
} as StrategyExport;
