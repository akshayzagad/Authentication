import {Router} from 'express';
import * as authController from '../controller/auth.controller.js';

const authRouter = Router();

authRouter.post("/register",authController.register);

/**@abstract
 * Login a user
 * @route POST /api/auth/login
 * @access Public
 * @returns {Object} - Returns a message indicating successful login
 */

authRouter.post("/login", authController.login);

/**@abstract
 * Get the logged in user
 * @route GET /api/auth/loggedIn
 * @access Public
 * @returns {Object} - Returns the logged in user
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

authRouter.post("/logout", authController.logout);

/**@abstract
 * logoutAll
 * @route POST /api/auth/logout
 * @access Public
 * @returns {Object} - Returns a message indicating successful logout
 */

authRouter.post("/logoutAll", authController.logoutAll);

export default authRouter;