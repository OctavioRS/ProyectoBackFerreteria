import {Router} from 'express'

const router = Router()

router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get('/error-register',(req,res)=>{
    res.render('errorRegister')
})

router.get('/error-login',(req,res)=>{
    res.render('errorLogin')
})

router.get('/profile',(req,res)=>{
    res.render('profile')
})

router.get('/changepass', (req, res) => {
   
    res.render('changepass');
});

//// JWT ////

router.get('/jwt',(req,res)=>{
    res.render('jwt')
});
export default router