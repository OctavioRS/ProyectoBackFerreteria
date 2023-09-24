import UserDao from "../daos/mongo/user.dao.js";

const userDao = new UserDao()

export const changeStatusService = async (uid, newRole) => {
  try {
    const exist = await userDao.getById(uid);
    if (!exist) {
      throw new Error('User not found');
    }
    
    if (newRole === 'premium') {
      exist.canCreateProducts = true;
      await exist.save();
    }
    
    const updatedRole = await userDao.updateStatus(uid, newRole);
    return updatedRole;
  } catch (error) {
    loggerDev.error(error.message);
    throw error;
  }
};
