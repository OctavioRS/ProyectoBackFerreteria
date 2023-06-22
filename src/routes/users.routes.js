import { Router } from 'express'
import passport from 'passport';
import { registerResponse, loginResponse, githubResponse } from '../controllers/users.controller.js'
import { userController , loginController } from '../controllers/users.controller.js'
const router = Router()


router.post('/register', passport.authenticate('register'), registerResponse);
router.post('/login', passport.authenticate('login'), loginResponse)

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

//router.post('/register',userController)
//router.post('/login', loginController)

export default router