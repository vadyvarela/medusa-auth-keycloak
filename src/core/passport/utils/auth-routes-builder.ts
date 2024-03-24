import { Request, Response, Router } from 'express';
import passport from 'passport';
import cors from 'cors';
import { authCallbackMiddleware, authenticateSessionFactory, signToken } from '../../auth-callback-middleware';
import { ConfigModule } from '@medusajs/medusa/dist/types/global';

type PassportAuthenticateMiddlewareOptions = {
	[key: string]: unknown;
	scope?: string | string[];
};

type PassportCallbackAuthenticateMiddlewareOptions = {
	[key: string]: unknown;
	failureRedirect: string;
};

/**
 * Build and return a router including the different route and configuration for a passport strategy
 * @param domain
 * @param configModule
 * @param authPath The path used to start the auth process e.g /admin/auth/google
 * @param authCallbackPath The pass used as the callback handler
 * @param strategyName The name use the define the strategy
 * @param passportAuthenticateMiddlewareOptions The options apply to the passport strategy on the auth path
 * @param passportCallbackAuthenticateMiddlewareOptions The options apply to the passport strategy on the callback auth path
 * @param expiresIn
 * @param successRedirect
 */
export function passportAuthRoutesBuilder({
	domain,
	configModule,
	authPath,
	strategyName,
	passportAuthenticateMiddlewareOptions,
	passportCallbackAuthenticateMiddlewareOptions,
	successRedirect,
	authCallbackPath,
	expiresIn,
}: {
	domain: 'admin' | 'store';
	configModule: ConfigModule;
	authPath: string;
	strategyName: string;
	passportAuthenticateMiddlewareOptions: PassportAuthenticateMiddlewareOptions;
	passportCallbackAuthenticateMiddlewareOptions: PassportCallbackAuthenticateMiddlewareOptions;
	successRedirect: string;
	authCallbackPath: string;
	expiresIn?: number;
}): Router {
	const router = Router();
	const defaultRedirect = successRedirect;
	let successAction: (req: Request, res: Response) => void;

	const corsOptions = {
		origin:
			domain === 'admin'
				? configModule.projectConfig.admin_cors.split(',')
				: configModule.projectConfig.store_cors.split(','),
		credentials: true,
	};

	router.get(authPath, cors(corsOptions));
	/* necessary if you are using non medusajs client such as a pure axios call, axios initially requests options and then get */
	router.options(authPath, cors(corsOptions));
	router.get(
		authPath,
		(req, res, next) => {
			// Allow to override the successRedirect by passing a query param `?redirectTo=your_url`
			successAction = successActionHandlerFactory(req, domain, configModule, defaultRedirect, expiresIn);
			next();
		},
		
		passport.authenticate(strategyName, {
			...passportAuthenticateMiddlewareOptions,
			session: false,
		})
	);

	const callbackHandler = authCallbackMiddleware((req, res) => successAction(req, res));

	router.get(authCallbackPath, cors(corsOptions));
	router.get(
		authCallbackPath,
		(req, res, next) => {
			if (req.user) {
				return callbackHandler(req, res);
			}

			next();
		},
		passport.authenticate(strategyName, {
			...passportCallbackAuthenticateMiddlewareOptions,
			session: false,
		}),
		callbackHandler
	);

	return router;
}

function successActionHandlerFactory(req: Request, domain: 'admin' | 'store', configModule: ConfigModule, defaultRedirect: string, expiresIn?: number) {
	const returnAccessToken = req.query.returnAccessToken == 'true';
	const redirectUrl = (req.query.redirectTo ? req.query.redirectTo : defaultRedirect) as string;

	if(returnAccessToken) {
		return (req: Request, res: Response) => {
			const token =  signToken(domain, configModule, req.user, expiresIn);
			res.json({ access_token: token });
		};
	} else {
		return (req: Request, res: Response) => {
			const authenticateSession = authenticateSessionFactory(domain);
			authenticateSession(req, res);

			//const token =  signToken(domain, configModule, req.user, expiresIn);

			// append token to redirect url as query param
			const url = new URL(redirectUrl);
			//url.searchParams.append('access_token', token);
			
			res.redirect(url.toString());
		};
	}
}
