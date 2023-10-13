import { Request, Response } from "express";
import httpStatus from "http-status";
import { transactionService } from "service";
import { errorHandlerWrapper } from "utils";

export const getTransactionsValidator = () => {
  return []
}

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

const getTransactionsHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const transactions = await transactionService.getTransactions();

  res.status(httpStatus.OK).json({
    message: 'Success.',
    ressult: transactions
  })
}

export const getTransactions = errorHandlerWrapper(getTransactionsHandler);
