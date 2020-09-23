import express from 'express';
import { Request, Response } from 'express';

import { createModels } from './models';
import { CatalogueInstance } from 'models/catalogue';
import * as bodyParser from "body-parser";
import {SendSQSMessage} from './messaging/send.message'

const app: express.Application = express();
const sequelizeConfig = require('./config/sequelizeConfig.json');
const db = createModels(sequelizeConfig);
db.sequelize.sync();
const sendSQSMessage = new SendSQSMessage();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('db',db);
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'hello, world' });
  });

  app.get('/catalogues', (req: Request, res: Response) => {
      db.Catalogue.findAll({include :[{model: db.Price , as: 'prices'}]}).then((catalogues : CatalogueInstance[]) => {
          res.status(200).json({catalogues})
      }).error(error => {res.status(500).json({error : ['Error: ',error]})})
      .catch(error => {res.status(500).json({error : ['Error: ',error]})});
  });

  app.post('/catalogue',(req : Request, res : Response) => {
        
       db.Catalogue.create(req.body , { include : [{model : db.Price, as:'prices'}]})
       .then(catalogue => {
           res.status(201).json({ catalogue });
        })
       .catch(err => res.status(500).json({ err: ['oops', err] }))
       .error(err => res.status(500).json({ err: ['oops', err] }));
  });

  app.post('/catalogue/update',(req : Request, res : Response) => {
        
    db.Catalogue.upsert(req.body)
    .then(catalogue => {
     let sqsMessageData = {
         MessageAttributes: {
           "catalogueId": {
             DataType: "String",
             StringValue: req.body.id.toString()
           },
           
         },
         MessageBody: JSON.stringify(req.body),
         MessageDeduplicationId: req.body['id'].toString(),
         MessageGroupId: "CatalougeUpdates",
         QueueUrl: sendSQSMessage.queueUrl
     };
        sendSQSMessage.sendMessage(sqsMessageData).then(data => console.log("Message Sent: "+ data.MessageId))
        .catch(error => console.log("Error sending message to SQS: "+error));
        res.status(201).json({ catalogue });

     })
    .catch(err => res.status(500).json({ err: ['oops', err] }))
    .error(err => res.status(500).json({ err: ['oops', err] }));
});

  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });