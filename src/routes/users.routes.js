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
import { multerField } from '../controllers/users.controller.js';
const router = Router()


//router.post('/register', passport.authenticate('register'), registerResponse);
//router.post('/login', passport.authenticate('login'), loginResponse)

router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

//router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ] }), githubResponse);

//router.post('/register',userController)
//router.post('/login', loginController)



////// JWT  ////////


router.post('/register', register);

router.post('/login', login);

router.post('/:uid/documents', uploader.single('documentFile'), async (req, res) => {
    try {
      const { uid } = req.params;
      const { file } = req;
  
      if (!file) {
        return res.status(400).json({ msg: 'No se proporcionó ningún archivo' });
      }
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: uid },
        {
          $push: {
            documents: {
              name: file.originalname,
              reference: file.filename,
            },
          },
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
  
      res.status(201).json({ msg: 'Documento subido con éxito', user: updatedUser });
    } catch (error) {
      console.error('Error al subir el documento:', error);
      res.status(500).json({ msg: 'Error al subir el documento' });
    }
  });
  

router.put('/premium/:uid', changeStatusController)

router.get('/private', checkAuth, privateRoute);

router.get('/current', passport.authenticate('current'), (req , res) => {
    res.send (req.user)
})

router.get('/dto/:id', getUserDtoController )

router.post('/changePassword' , sendMailEthereal  )

router.post('/updatingPass', updatePassController)



export default router
