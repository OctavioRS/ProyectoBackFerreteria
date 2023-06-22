import { createUserService, loginUserService } from "../services/users.services.js"
import UserDao from "../daos/mongo/user.dao.js";
const userDao = new UserDao() 

export const userController = async (req, res, next) => {
  try {
    const docs = await createUserService(req.body);
    if (docs) {
      res.redirect('/views');
    } else {
      res.redirect('/views/error-register');
    }
  } catch (error) {
    next(error);
  }
}

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUserService(req.body);
    console.log(user)
    if (user) {
      req.session.email = email;
      req.session.password = password;
      res.redirect('/views/profile');
    } else {
      res.redirect('/views/error-login');
    }
  } catch (error) {
    next(error);
  }
}


export const registerResponse = (req, res, next)=>{
  try {
      res.json({
          msg: 'Register OK',
          session: req.session    
      })
  } catch (error) {
      next(error);
  }
};

export const loginResponse = async(req, res, next)=>{
  try {
      
      res.json({
          msg: 'Login OK',
          session: req.session,
       
      })
  } catch (error) {
      next(error);
  }
}

export const githubResponse = async(req, res, next)=>{
  try {
      const { first_name, last_name, email, role, isGithub } = req.user;
      res.json({
          msg: 'Register/Login Github OK',
          session: req.session,
          userData: {
             first_name,
             last_name,
            email,
             role,
            isGithub
         }
      })
  } catch (error) {
      next(error);
  }
}