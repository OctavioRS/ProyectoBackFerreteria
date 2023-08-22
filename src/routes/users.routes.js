import { Router } from 'express'
import passport from 'passport';
//import { registerResponse, loginResponse, githubResponse } from '../controllers/users.controller.js'
//import { userController , loginController } from '../controllers/users.controller.js'
import { register, login, loginFront, privateRoute } from '../controllers/users.controller.js';
import { getUserDtoController } from '../controllers/users.controller.js';
import { checkAuth } from '../jwt/auth.js';
import { changeStatusController } from '../controllers/changeStatusController.js';
import { updatePassController } from '../controllers/changePassControllers.js';
import { sendMailEthereal } from '../controllers/changePassControllers.js';
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

router.put('/premium/:uid', changeStatusController)

router.get('/private', checkAuth, privateRoute);

router.get('/current', passport.authenticate('current'), (req , res) => {
    res.send (req.user)
})

router.get('/dto/:id', getUserDtoController )

router.post('/changePassword' , sendMailEthereal  )

router.post('/updatingPass', updatePassController)



export default router
