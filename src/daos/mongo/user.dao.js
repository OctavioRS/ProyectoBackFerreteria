import { userModel } from "../models/user.models.js"; 

export default class UserDao {
  async createUser(user) {
    try {
      const { email, password } = user;
      const existUser = await userModel.find({email});
      if(existUser.length === 0){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          return await userModel.create({...user, role: 'admin'});
        } else {
          const newUser = await userModel.create(user);
          return newUser
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async loginUser(user) {
    try {
      const { email, password } = user;
      const userExist = await userModel.findOne({ email, password }).select('email password');
      if (userExist) {
        return { email: userExist.email, password: userExist.password };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  
}  