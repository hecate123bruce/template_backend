import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  balance: {
    type: Number,
    require: true
  }
})

export const User = mongoose.model('users', userSchema);
