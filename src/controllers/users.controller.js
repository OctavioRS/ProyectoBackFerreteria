import { createUserService, loginUserService } from "../services/users.services.js"

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
