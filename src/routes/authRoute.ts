import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authRefreshTokenValidation } from '../middleware/validation/authRefreshTokenValidation';
import { authLoginValidation, authRegisterValidation } from '../middleware/validation/authValidation';
import { handleValidation } from '../middleware/validation/handleValidation';

const authRoute = Router();

authRoute.post('/auth/register', authRegisterValidation(), handleValidation, AuthController.register);

// Tive que mudar de Get para Post por causa do Swagger (não aceita body em get) !! <<
authRoute.post('/auth/login', authLoginValidation(), handleValidation, AuthController.login);

// FAZER Rota de refresh token !!!!!
authRoute.post('/auth/refresh-token', authRefreshTokenValidation(), handleValidation, AuthController.refreshToken);

export default authRoute;