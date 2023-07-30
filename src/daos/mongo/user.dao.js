import { createHash, isValidPassword } from "../../path.js";
import { userModel } from "../models/user.models.js"; 
import { cartsModel } from "../models/carts.models.js";
import UserDto from "../../dtos/user.dto.js";


export default class UserDao {
  async createUser(user) {
    try {
      const { first_name, last_name,  age, cart,  email, password } = user;
      const existUser = await userModel.find({email});
      if(existUser.length === 0){
        if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
          return await userModel.create({...user, password: createHash(password), role: 'admin'});
        } else {
          const newUser = await userModel.create({...user, password: createHash(password)});
          const newCart = await cartsModel.create({ products: [] });

          newUser.cart = newCart._id;
          await newUser.save();

          return newUser;
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
      const userExist = await userModel.findOne({ email })
     
      if (userExist) {
        const isValid = isValidPassword(password, userExist);
        if (!isValid)return false
        else return userExist
      } return false
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getById(id){
    try {
      const userExist = await userModel.findById(id)
      // console.log(userExist);
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      console.log(error)
      // throw new Error(error)
    }
  }

  async getByEmail(email){
    try {
      const userExist = await userModel.findOne({email}); 
      console.log('user::::', userExist)
      if(userExist){
       return userExist
      } return false
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  async getByIdDTO(_id){
    try {
      const user = await userModel.findById(_id)
      const userDTO = new UserDto(user)
      return userDTO
    } catch (error) {
      console.log(error)
      
    }
  }
}  