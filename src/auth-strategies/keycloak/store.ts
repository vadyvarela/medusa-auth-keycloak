import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { ConfigModule, MedusaContainer } from '@medusajs/medusa/dist/types/global';
import { Router } from 'express';
import { KEYCLOAK_STORE_STRATEGY_NAME, KeycloakAuthOptions, Profile } from './types';
import { PassportStrategy } from '../../core/passport/Strategy';
import { validateStoreCallback } from '../../core/validate-callback';
import { passportAuthRoutesBuilder } from '../../core/passport/utils/auth-routes-builder';
import { AuthOptions } from '../../types';
import KeycloakBearerStrategy from 'passport-keycloak-bearer'
import keycloak from "passport-keycloak-jwt-introspect";
import { Strategy as KeyCloakStrategy } from 'passport-keycloak-oauth2-oidc';

export class KeycloakStoreStrategy extends PassportStrategy(KeyCloakStrategy, KEYCLOAK_STORE_STRATEGY_NAME) {

	constructor(
		protected readonly container: MedusaContainer,
		protected readonly configModule: ConfigModule,
		protected readonly strategyOptions,
		protected readonly strict?: AuthOptions['strict']
	) {
		super({
			clientID: 'vady-obc',
			realm: 'vady',
			publicClient: 'false',
			clientSecret: 'vbMYKjSpd6LKomk05Wy8dJMkdnV7zdhV',
			sslRequired: 'external',
			scope: "openid profile email",
			authServerURL: 'http://localhost:8080',
			callbackURL: 'http://localhost:9000/admin/auth/keycloak/cb'
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
