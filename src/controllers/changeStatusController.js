import UserDao from "../daos/mongo/user.dao.js";
import { changeStatusService } from "../services/changeStatusService.js";
const userDao = new UserDao()

export const changeStatusController = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const { role } = req.body; 
      const updatedRole = await changeStatusService(uid, role);
      res.json({ message: 'Role updated successfully', newRole: updatedRole });
    } catch (error) {
      loggerDev.error(error.message);
      Httpresponse.ServerError(res, error);
    }
  };
  