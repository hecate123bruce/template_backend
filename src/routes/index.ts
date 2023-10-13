import express from 'express';
import userRouter from './user.router';
import transactionRouter from './transaction.router';

const appRoutes = express.Router();

appRoutes.use('/user', userRouter);
appRoutes.use('/transaction', transactionRouter);

export default appRoutes;
