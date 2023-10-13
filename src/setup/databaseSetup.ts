import { connectionUri } from "../config";
import { MESSAGES } from "../const";
import mongoose from "mongoose";
import { Logger } from "../utils";

const databaseSetup =async (next: () => void) => {
  try {
    //connect to MongoDb
    await mongoose.connect(connectionUri, {});
    Logger.info(MESSAGES.DATABASE_CONNECTOIN_SUCCESS);
    next();
  } catch(error) {
    Logger.log(error);
    Logger.error(MESSAGES.DATABASE_CONNECTION_FAILURE);
  }
};

export default databaseSetup;
