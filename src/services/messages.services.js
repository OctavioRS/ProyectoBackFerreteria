import MessageDaoMongoDB from "../daos/mongo/messages.dao.js";
const messagesDaoMongo = new MessageDaoMongoDB();

export const getMsg = async () => {
    try {
        const docs = await messagesDaoMongo.getMessage()
        return docs;
    } catch (error) {
        throw new Error(error)
    }
}

export const sendMsg = async (obj) => {
    try {
        const newMssg = await messagesDaoMongo.sendMessage(obj)
        return newMssg;
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteMsg = async (id) => {
    try {
        const mssgDel = await messagesDaoMongo.deleteMessage(id)
        return mssgDel;
    } catch (error) {
        throw new Error(error)
    }
}