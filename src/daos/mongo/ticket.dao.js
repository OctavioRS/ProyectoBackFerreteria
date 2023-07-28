import { ticketModel } from '../models/ticket.models.js'

class TicketDaoMongoDB {
   
    async createTicket(ticketData) {
      try {
        const data = await ticketModel.create({
          ...ticketData,
          purchase_datetime: new Date()
        })
        
        return data
      } catch (error) {
        console.log(error);
      }
    }
}


  export default TicketDaoMongoDB;