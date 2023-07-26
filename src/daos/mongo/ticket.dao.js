import { ticketModel } from '../models/ticket.models.js'

class TicketDaoMongoDB {
   
    async createTicket(ticketData) {
      try {
        const response = await ticketModel.create(ticketData);
        return response
        
      } catch (error) {
        console.log(error);
      }
    }
}
  export default TicketDaoMongoDB;