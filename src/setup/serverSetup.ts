import express, { Express } from 'express';
import cors from 'cors';
import { json as bodyParserJSON } from 'body-parser';
import { MESSAGES } from 'const';
import { API_VERSION } from 'config';
import appRoutes from 'routes';

const port = process.env.PORT || 8000;

const serverSetup = (app: Express) => {
  
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  //check health.
  app.use('/health', function(req, res) {
    res.send('OK')
  })

  app.use(`/api/${API_VERSION}`, appRoutes);

  const server = app.listen(port, () => {
    console.info(MESSAGES.SERVER_RUN_SUCCESS);
  });

  return server;
}

export default serverSetup;
