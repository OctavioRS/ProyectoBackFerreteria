import mongoose from 'mongoose'

const conectionString = 'mongodb+srv://octavio:octavio@clusterecommerce.xka9yxf.mongodb.net/Ecommerce?retryWrites=true&w=majority'
try {
    await mongoose.connect(conectionString)
    console.log('Conectado a Mongoose')
} catch (error) {
    console.log(error)
}