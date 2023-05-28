import * as functions from 'firebase-functions';
import crypto = require('crypto');
import {transferSuccess} from './transferSuccess';
import {transferFailed} from './transferFailed';
import {transferReversed} from './transferReversed';


export const webhook = functions.runWith({secrets: ["PSK_SECRET_KEY"]}).region("us-central1").https.onRequest((req: any, res: any) => {
  if (req.method !== 'POST') {
    return res.status(400).send('Invalid request method.');
  }

  const secret = process.env.PSK_SECRET_KEY as string;

  const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
  if (hash == req.headers['x-paystack-signature']) {
    try {
      switch (req.body.event) {
        case 'transfer.success':
          transferSuccess(req.body.data);
          break;
        case 'transfer.failed':
          transferFailed(req.body.data);
          break;
        case 'transfer.reversed':
          transferReversed(req.body.data);
          break;
      }
    } catch (e) {
      console.log(e);
    } finally {
      res.status(200).send('Webhook received successfully.');
    }
  } else {
    return res.status(400).send('Invalid signature.');
  }
});

