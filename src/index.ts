import express from 'express';

import { 
  databaseSetup, 
  serverSetup 
} from './setup';

const app = express()
let server;

databaseSetup(() => {
  server = serverSetup(app);
})

export {
  server,
  app
}
