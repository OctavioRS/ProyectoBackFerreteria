import { ticketModel } from '../models/ticket.models.js'
import { loggerDev } from '../../utils/loggers.js';

class TicketDaoMongoDB {
   
    async createTicket(ticketData) {
      try {
        const data = await ticketModel.create({
          ...ticketData,
          purchase_datetime: new Date()
        })
        
        return data
      } catch (error) {
        loggerDev.error(error.message)
        throw new Error(error)
      }
    }
}


  export default TicketDaoMongoDB;