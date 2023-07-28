import { createUserService, loginUserService } from "../services/users.services.js"
import { generateToken } from "../jwt/auth.js";
import UserDao from "../daos/mongo/user.dao.js";
const userDao = new UserDao()
import { getUserDto } from "../services/users.services.js";
/*
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
*/
/////  JWT  ///////

export const register = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, cart, password } = req.body;
    const exist = await userDao.getByEmail(email);
    if (exist) return res.status(400).json({ msg: 'user already exists' });
    const user = { first_name, last_name, email, age, password }
    const newUser = await userDao.createUser(user);
    const token = generateToken(newUser);
    res.json({
      msg: 'Register OK',
      token
    })
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.loginUser({ email, password });
    if (!user) req.json({ msg: 'invalid credentials' });
    const access_token = generateToken(user);
    res.header('authorization', access_token).json({ msg: 'Login OK', access_token })
  } catch (error) {
    next(error);
  }
}
export const privateRoute = async (req, res) => {
  const { first_name, last_name, email, role } = req.user;
  res.json({
    status: 'success',
    userData: {
      first_name,
      last_name,
      email,
      role
    }
  })
}

export const loginFront = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.loginUser({ email, password });
    if (!user) {
      return res.json({ msg: 'invalid credentials' });
    }
    const access_token = generateToken(user)
    res.cookie('token', access_token,
      { httpOnly: true } 
    )
      res.json({ msg: 'Login OK', access_token })
  } catch (error) {
    next(error);
  }
}

export const getUserDtoController = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await getUserDto(id)
     res.json(user)
    
    } catch (error) {
      next(error);
  }
}