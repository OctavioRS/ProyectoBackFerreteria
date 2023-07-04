import { Router } from 'express'
import passport from 'passport';
//import { registerResponse, loginResponse, githubResponse } from '../controllers/users.controller.js'
//import { userController , loginController } from '../controllers/users.controller.js'
import { register, login, loginFront, privateRoute } from '../controllers/users.controller.js';
import { checkAuth } from '../jwt/auth.js';
const router = Router()


//router.post('/register', passport.authenticate('register'), registerResponse);
//router.post('/login', passport.authenticate('login'), loginResponse)

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

//router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

//router.post('/register',userController)
//router.post('/login', loginController)



////// JWT  ////////

router.post('/loginfront', loginFront);

router.post('/register', register);

router.post('/login', login);

router.get('/private', checkAuth, privateRoute);

router.get('/current', passport.authenticate('current'), (req , res) => {
    res.send (req.user)
})





export default router
