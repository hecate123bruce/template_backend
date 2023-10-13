import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    require: true
  },
  recieverId: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    require: true
  },
  amount: {
    type: Number,
    require: true
  }
})

export const Transaction = mongoose.model('transactions', transactionSchema);
