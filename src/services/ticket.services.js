import TicketDaoMongoDB from '../daos/mongo/ticket.dao.js';
import { loggerDev } from '../../utils/loggers.js';

const ticketDaoMongo = new TicketDaoMongoDB();
class TicketService {

  async generateTicket(ticket) {
    try {
      const newTicket = await ticketDaoMongo.createTicket(ticket)
      return newTicket
    } catch (error) {
      loggerDev.error(error.message)
      throw new Error(error)
    }
}
}
export default new TicketService();
