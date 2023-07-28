import TicketService from "../services/ticket.services.js";

function generateCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}


export const ticketController = async (req, res, next) => {
  try {
    const ticket = {
      amount: 100, 
      code: generateCode(5),
      purchaser: req.session.id,
      cart: req.user.cart
    };
    console.log('Contenido de req.session:', req.session);
    const newTicket = await TicketService.generateTicket(ticket);

    // Imprime el contenido de newTicket en la consola para verificarlo.
    console.log('Nuevo ticket generado:', newTicket);

    res.status(200).json(newTicket);

  } catch (error) {
    console.log('Error en el controlador:', error);
    res.status(500).json({
      error: 'Error al procesar la solicitud',
    });
  }
};
