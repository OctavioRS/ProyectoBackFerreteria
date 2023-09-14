import UserDao from '../daos/mongo/user.dao.js'
import { loggerDev } from '../utils/loggers.js';

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
  