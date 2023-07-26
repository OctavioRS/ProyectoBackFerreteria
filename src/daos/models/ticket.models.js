import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({

    
    code: { type: String, required: true },
    purchase_datetime: { type: Date, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
   

})


export const ticketModel = mongoose.model('ticket',
    ticketSchema) 