import { messageModel } from "../models/messages.models.js";

class MessageDaoMongoDB {
   
    async sendMessage({ user, message }) {
      try {
        const response = await messageModel.create({user: user, message: message});
        return response
        
      } catch (error) {
        console.log(error);
      }
    }
  
    async getMessage() {
      try {
       const response = await messageModel.find({});
      return response
        
      } catch (e) {
        console.log(e);
      }
}
  
    async deleteMessage(id) {
        try {
            const response = await messageModel.findByIdAndDelete(id);
            return response
         } catch (error) {
            console.log(error);
         }
    }
  
}
  export default MessageDaoMongoDB;