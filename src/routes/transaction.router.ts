import { transactionsContrller } from 'controller';
import express from 'express';
import { Logger } from 'utils';

const transactionRouter = express.Router();

//basePath api/v1/transaction

transactionRouter.get('/test', (req, res) => Logger.log('this is test to access transactionRouter.'));

//create Transaction
transactionRouter.post(
  '/',
  transactionsContrller.createTransactionValidator(),
  transactionsContrller.createTransaction
)

//get transactions
transactionRouter.get(
  '/',
  transactionsContrller.getTransactionsValidator(),
  transactionsContrller.getTransactions
)

export default transactionRouter;
