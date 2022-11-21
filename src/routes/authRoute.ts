import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authLoginValidation, authRegisterValidation } from '../middleware/validation/authValidation';
import { handleValidation } from '../middleware/validation/handleValidation';

const authRoute = Router();

authRoute.post('/auth/register', authRegisterValidation(), handleValidation, AuthController.register);

authRoute.get('/auth/login', authLoginValidation(), handleValidation, AuthController.login);

export default authRoute;