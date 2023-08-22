import UserDao from "../daos/mongo/user.dao.js";
import { changeStatusService } from "../services/changeStatusService.js";
const userDao = new UserDao()

export const changeStatusController = async (req, res, next) => {
    try {
      const { uid } = req.params;
      
      const userToUpdate = await userDao.getById(uid)
      const newRole = userToUpdate.role === 'user' ? 'premium' : 'user';
      const updatedRole = await changeStatusService(uid, newRole);
      res.json({ message: 'Role updated successfully', newRole: updatedRole });
    } catch (error) {
      loggerDev.error(error.message);
      Httpresponse.ServerError(res, error);
    }
  };
  