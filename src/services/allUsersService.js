import { loggerDev } from "../utils/loggers.js";
import UserDao from "../daos/mongo/user.dao.js";
const usersDaoMongo = new UserDao();


export const AllUsersDtoService = async () => {
    try {
      const data = await usersDaoMongo.getAllUsersDto();
      if(!data) return false
     return data
  } catch (error) {
    loggerDev.error(error.message)
    throw new Error(error)
  }
    }