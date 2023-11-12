import { AuthOptions, StrategyExport } from '../../types';
import { Router } from 'express';
import { getKeycloakAdminAuthRouter, KeycloakAdminStrategy } from './admin';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { KeycloakStoreStrategy, getKeycloakStoreAuthRouter } from './store';

export * from './types';
export * from './admin';
export * from './store';

export default {
	load: (container: MedusaContainer, configModule: ConfigModule, options: AuthOptions): void => {
		if (options.keycloak?.admin) {
			new KeycloakAdminStrategy(container, configModule, options.keycloak, options.strict);
		}
		if (options.keycloak?.store) {
			new KeycloakStoreStrategy(container, configModule, options.keycloak, options.strict);
		}

	},
	getRouter: (configModule: ConfigModule, options: AuthOptions): Router[] => {
		const routers = [];

		if (options.keycloak?.admin) {
			routers.push(getKeycloakAdminAuthRouter(options.keycloak, configModule));
		}
		if (options.keycloak?.store) {
			routers.push(getKeycloakStoreAuthRouter(options.keycloak, configModule));
		}

		return routers;
	},
} as StrategyExport;
