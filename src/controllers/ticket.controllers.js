import TicketService from "../services/ticket.services.js";

class TicketController {
  async generateTicket(req, res) {
    const cartId = req.params.cid;
    const userId = req.user.email; // Suponiendo que tienes el correo del usuario en la solicitud

    try {
      const ticket = await TicketService.generateTicket(cartId, userId);
      return res.status(200).json({ message: 'Compra exitosa', ticket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  }
}

export default new TicketController()