import UserDao from '../daos/mongo/user.dao.js'
import { loggerDev } from '../utils/loggers.js';
import { transporter } from './email.services.js';
import { userModel } from '../daos/models/user.models.js';

const usersDaoMongo = new UserDao();

export const createUserService = async (user) => {
  try {
    const newUser = await usersDaoMongo.createUser(user)
    
   return newUser;
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}

export const loginUserService = async (user) => {
  try {
    const data = await usersDaoMongo.loginUser(user);

   return data
} catch (error) {
  loggerDev.error(error.message)
  throw new Error(error)
}
  }

 export const getUserDto = async (id) => {
    try {
      const data = await usersDaoMongo.getByIdDTO(id);
      if(!data) return false
     return data
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
}

export const limpiarUsuariosInactivos = async () => {
  try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const usuariosInactivos = await userModel.find({
          last_conection: { $lt: twoDaysAgo },
      });

      for (const usuario of usuariosInactivos) {
  
          await this.enviarCorreoAviso(usuario);

          await usuario.remove();
      }
  } catch (error) {
      loggerDev.error('Error al limpiar usuarios inactivos:', error);
      throw new Error(error);
  }
}

export const enviarCorreoAviso = async(usuario) => {
  try {
      const mailOptions = {
          from: config.email_ethereal,
          to: usuario.email, 
          subject: 'Aviso de inactividad',
          text: `Hola ${usuario.first_name},\n\nTu cuenta ha estado inactiva por un tiempo.`, 
      };

      await transporter.sendMail(mailOptions);
  } catch (error) {
      console.error('Error al enviar el correo de aviso:', error);
      throw new Error(error);
  }
}

