// ticket.controllers.js

import TicketDaoMongoDB from '../daos/mongo/ticket.dao.js';
import CartsDaoMongoDB from '../daos/mongo/carts.dao.js';
import ProductDaoMongoDB from '../daos/mongo/products.dao.js';

const ticketDaoMongo = new TicketDaoMongoDB();
const productDaoMongo = new ProductDaoMongoDB();
const cartDaoMongo = new CartsDaoMongoDB();

let uniqueCodeCounter = 1;

function generateUniqueCode() {
  const currentCounter = uniqueCodeCounter;
  uniqueCodeCounter++;
  const uniqueCode = `TICKET-${currentCounter.toString().padStart(6, '0')}`;
  return uniqueCode;
}

class TicketService {
  async generateTicket(cid, uid) {
    // Obtener el carrito de la base de datos
    const cart = await cartDaoMongo.findById(cid).populate('products.product');

    if (!cart) {
      throw new Error('Cart not found');
    }

    const productsNotProcessed = [];

    // Verificar el stock de los productos en el carrito
    for (const item of cart.products) {
      const product = item.product;
      const requestedQuantity = item.quantity;

      // Comprobar si hay suficiente stock para la cantidad solicitada
      if (product.stock >= requestedQuantity) {
        // Restar la cantidad del stock del producto
        product.stock -= requestedQuantity;
        await product.save();
      } else {
        // Si no hay suficiente stock, agregar el ID del producto al arreglo de no procesados
        productsNotProcessed.push(product._id);
      }
    }

    // Actualizar el estado del carrito a "comprado" solo si todos los productos tienen stock suficiente
    if (productsNotProcessed.length === 0) {
      cart.purchased = true;
      await cart.save();

      // Crear un nuevo Ticket para la compra
      const ticketData = {
        code: generateUniqueCode(), // Implementa la función para generar un código único
        purchase_datetime: new Date(),
        amount: cart.totalAmount,
        purchaser: uid,
      };

      return ticketDaoMongo.createTicket(ticketData);
    } else {
      // Si hay productos no procesados, devolver el arreglo de sus IDs
      return { productsNotProcessed };
    }
  }
}

export default TicketService;
