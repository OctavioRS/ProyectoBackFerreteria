import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0
  },
  password: {
    type: String,
    required: true,
  },
  cart: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'carts',
      default: null
    }
  ,
  role: {
    type: String,
    default: 'user'
  },
  isGithub: {
    type: Boolean,
    default: false
  },
  canCreateProducts: {
    type: Boolean,
    default: false
  },
  documents: [
    {
      name:{
        type: String
      },
      reference:{
        type: String
      }
    }
  ],
  last_conection: {
    type: Date
  }
})
usersSchema.pre('find', function () {
  this.populate('carts');
});
export const userModel = mongoose.model('users',usersSchema)