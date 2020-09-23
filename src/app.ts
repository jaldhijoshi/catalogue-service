import express from 'express';
import { Request, Response } from 'express';

import { createModels } from './models';
import { CatalogueInstance } from 'models/catalogue';
import * as bodyParser from "body-parser";

const app: express.Application = express();
const sequelizeConfig = require('./config/sequelizeConfig.json');
const db = createModels(sequelizeConfig);
db.sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello, world' });
  });

  app.get('/catalogues', (req: Request, res: Response) => {
      db.Catalogue.findAll({include :[{model: db.Price , as: 'prices'}]}).then((catalogues : CatalogueInstance[]) => {
          res.status(200).json({catalogues})
      }).error(error => {res.status(500).json({error : ['Error: ',error]})});
  });

  app.post('/catalogue',(req : Request, res : Response) => {

       db.Catalogue.create(req.body , { include : [{model : db.Price, as:'prices'}]})
       .then(catalogue => res.status(201).json({ catalogue }))
       .catch(err => res.status(500).json({ err: ['oops', err] }))
       .error(err => res.status(500).json({ err: ['oops', err] }));
  });
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });