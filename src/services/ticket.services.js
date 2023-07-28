import TicketDaoMongoDB from '../daos/mongo/ticket.dao.js';

const ticketDaoMongo = new TicketDaoMongoDB();
class TicketService {

  async generateTicket(ticket) {
    try {
      const newTicket = await ticketDaoMongo.createTicket(ticket)
      return newTicket
    } catch (error) {
      console.log(error)
    }
}
}
export default new TicketService();
