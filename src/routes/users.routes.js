import { Router } from 'express'
import passport from 'passport';
import { registerResponse, loginResponse } from '../controllers/users.controller.js'
import { userController , loginController } from '../controllers/users.controller.js'
const router = Router()


router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login'), loginResponse)

//router.post('/register',userController)
//router.post('/login', loginController)

export default router