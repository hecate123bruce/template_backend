import { Transaction } from "models";
import { TransactionType } from "type";

export const createTransaction =async (data: TransactionType) => {
  const transaction = new Transaction(data);
  const result = await transaction.save();
  return result;
}

export const getTransactions =async () => {
  const transactions = await Transaction.find({}, {
    _id: false,
    senderId: true,
    recieverId: true,
    amount: true
  });

  return transactions;
}
