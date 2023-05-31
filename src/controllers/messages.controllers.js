import {
    sendMsg,
    getMsg,
    deleteMsg,
} from '../services/messages.services.js'

export const getControllerMsg = async (req, res, next) => {
    try {
     const docs = await getMsg();
     res.json(docs);
    } catch (error) {
      next(error);
    }
  };
  
  export const createControllerMsg = async (req, res, next) => {
    try {
      const { user , message } = req.body;
      const newDoc = await sendMsg({
       user,
       message
      });
      res.json(newDoc);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteControllerMsg = async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteMsg(id);
      res.json({message: 'Message deleted successfully!'})
    } catch (error) {
      next(error);
    }
  };