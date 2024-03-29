import { createUserService, loginUserService } from "../services/users.services.js"
import { generateToken } from "../jwt/auth.js";
import UserDao from "../daos/mongo/user.dao.js";
const userDao = new UserDao()
import { getUserDto } from "../services/users.services.js";
import { HttpResponse } from '../utils/http.response.js';
import { loggerDev } from '../utils/loggers.js';
import { limpiarUsuariosInactivos } from "../services/users.services.js";
import multer from 'multer';
import { __dirname } from '../path.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir;

    if (file.fieldname === 'profileImage') {
      uploadDir = __dirname + '/public/profiles';
    } else if (file.fieldname === 'productImage') {
      uploadDir = __dirname + '/public/products';
    } else if (file.fieldname === 'documentFile') {
      uploadDir = __dirname + '/public/documents';
    } else {
      // Manejo de caso no definido (puedes manejarlo como desees)
      uploadDir = __dirname + '/public/unknown';
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const multerField = multer({ storage });


const Httpresponse = new HttpResponse();
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
    const { first_name, last_name, email, age, password, role, isGithub, canCreateProducts } = req.body;
    const exist = await userDao.getByEmail(email);
    if (exist) return res.status(400).json({ msg: 'user already exists' });
    const user = { first_name, last_name, email, age, password, role, isGithub, canCreateProducts }
    const newUser = await userDao.createUser(user);
    const token = generateToken(newUser);
    res.json({
      msg: 'Register OK',
      newUser,
      token
    })
  } catch (error) {
    loggerDev.error(error.message)
    return Httpresponse.ServerError(res, error)
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.loginUser({ email, password });
    if (!user) req.json({ msg: 'invalid credentials' });
    const last_conection = user.last_connection = new Date();
    user.save()
    const access_token = generateToken(user);
    res.header('authorization', access_token).json({ msg: 'Login OK', access_token, last_conection })
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
    loggerDev.error(error.message)
    return Httpresponse.ServerError(res, error)
  }
}
export const getUserDtoController = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await getUserDto(id)
    res.json(user)
  } catch (error) {
    loggerDev.error(error.message)
    return Httpresponse.NotFound(res, error)
  }
}

export const deleteIanctiveUsers = async (req, res, next) => {
  try {
    await limpiarUsuariosInactivos();
    res.status(200).json({ message: 'La limpieza se ha completado exitosamente.' });
  } catch (error) {
    loggerDev.error(error.message)
  }
}