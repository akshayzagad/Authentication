import {Router} from 'express';
import * as authController from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post("/register",authController.register);

/**
 * getMe
 */

authRouter.get("/loggedIn",authController.loggedIn);

/**@abstract
 * Get the refresh token from the cookie and generate a new access token
 * @route GET /api/auth/refreshToken
 * @access Public
 * @returns {Object} - Returns a new access token
 */
authRouter.get("/refreshToken", authController.refreshToken);
 
/**@abstract
 * logout
 * @route POST /api/auth/logout
 * @access Public
 * @returns {Object} - Returns a message indicating successful logout   
 */

authRouter.get("/logout", authController.logout);

export default authRouter;