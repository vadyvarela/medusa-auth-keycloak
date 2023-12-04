import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { KEYCLOAK_ADMIN_STRATEGY_NAME, KeycloakAuthOptions, Profile } from './types';
import { PassportStrategy } from '../../core/passport/Strategy';
import { validateAdminCallback } from '../../core/validate-callback';
import { passportAuthRoutesBuilder } from '../../core/passport/utils/auth-routes-builder';
import { AuthOptions } from '../../types';
import { KeyCloakStrategy } from '../../core/passport-keycloak-oauth2-oidc';

export class KeycloakAdminStrategy extends PassportStrategy(KeyCloakStrategy, KEYCLOAK_ADMIN_STRATEGY_NAME) {

	constructor(
		protected readonly container: MedusaContainer,
		protected readonly configModule: ConfigModule,
		protected readonly strategyOptions: KeycloakAuthOptions,
		protected readonly strict?: AuthOptions['strict']
	) {
		super({
			clientID: strategyOptions.clientID,
			realm: strategyOptions.realm,
			publicClient: strategyOptions.publicClient,
			clientSecret: strategyOptions.clientSecret,
			sslRequired: strategyOptions.sslRequired,
			scope: strategyOptions.scope,
			authServerURL: strategyOptions.authServerURL,
			callbackURL: strategyOptions.admin.callbackUrl,
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile
	): Promise<null | { id: string }> {
		if (this.strategyOptions.admin.verifyCallback) {
			return await this.strategyOptions.admin.verifyCallback(
				this.container,
				accessToken,
				refreshToken,
				profile,
				this.strict
			);
		}

		return await validateAdminCallback(profile, {
			container: this.container,
			strategyErrorIdentifier: 'keycloak',
			strict: this.strict,
		});
	}
}

/**
 * Return the router that hold the keycloak admin authentication routes
 * @param keycloak
 * @param configModule
 */
export function getKeycloakAdminAuthRouter(keycloak: KeycloakAuthOptions, configModule: ConfigModule): Router {
	return passportAuthRoutesBuilder({
		domain: 'admin',
		configModule,
		authPath: keycloak.admin.authPath ?? '/admin/auth/keycloak',
		authCallbackPath: keycloak.admin.authCallbackPath ?? '/admin/auth/keycloak/cb',
		successRedirect: keycloak.admin.successRedirect,
		strategyName: KEYCLOAK_ADMIN_STRATEGY_NAME,
		passportAuthenticateMiddlewareOptions: {
			scope: ["profile"],
		},
		passportCallbackAuthenticateMiddlewareOptions: {
			failureRedirect: keycloak.admin.failureRedirect,
		},
		expiresIn: keycloak.admin.expiresIn,
	});
}
