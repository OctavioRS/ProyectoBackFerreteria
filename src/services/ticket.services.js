import TicketDaoMongoDB from '../daos/mongo/ticket.dao.js';

const ticketDaoMongo = new TicketDaoMongoDB();
class TicketService {

  async generateTicket(ticket) {
    try {
      const newTicket = await ticketDaoMongo.createTicket(ticket)
      return newTicket
    } catch (error) {
      throw new Error(error)
    }
}
}
export default new TicketService();
