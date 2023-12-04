import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { KEYCLOAK_STORE_STRATEGY_NAME, KeycloakAuthOptions, Profile } from './types';
import { PassportStrategy } from '../../core/passport/Strategy';
import { validateStoreCallback } from '../../core/validate-callback';
import { passportAuthRoutesBuilder } from '../../core/passport/utils/auth-routes-builder';
import { AuthOptions } from '../../types';
import { KeyCloakStrategy } from '../../core/passport-keycloak-oauth2-oidc';

export class KeycloakStoreStrategy extends PassportStrategy(KeyCloakStrategy, KEYCLOAK_STORE_STRATEGY_NAME) {

	constructor(
		protected readonly container: MedusaContainer,
		protected readonly configModule: ConfigModule,
		protected readonly strategyOptions,
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
			callbackURL: strategyOptions.store.callbackUrl,
		});
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile
	): Promise<null | { id: string }> {
		if (this.strategyOptions.store.verifyCallback) {
			return await this.strategyOptions.store.verifyCallback(
				this.container,
				accessToken,
				refreshToken,
				profile,
				this.strict
			);
		}

		return await validateStoreCallback(profile, {
			container: this.container,
			strategyErrorIdentifier: 'keycloak',
			strict: this.strict,
		});
	}
}

/**
 * Return the router that hold the keycloak store authentication routes
 * @param keycloak
 * @param configModule
 */
export function getKeycloakStoreAuthRouter(keycloak: KeycloakAuthOptions, configModule: ConfigModule): Router {
	return passportAuthRoutesBuilder({
		domain: 'store',
		configModule,
		authPath: keycloak.store.authPath ?? '/store/auth/keycloak',
		authCallbackPath: keycloak.store.authCallbackPath ?? '/store/auth/keycloak/cb',
		successRedirect: keycloak.store.successRedirect,
		strategyName: KEYCLOAK_STORE_STRATEGY_NAME,
		passportAuthenticateMiddlewareOptions: {
			scope: ["profile"],
		},
		passportCallbackAuthenticateMiddlewareOptions: {
			failureRedirect: keycloak.store.failureRedirect,
		},
		expiresIn: keycloak.store.expiresIn,
	});
}
