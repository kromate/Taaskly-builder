import axios from 'axios';
import {IncomingWebhook} from "@slack/webhook";
import sgMail = require('@sendgrid/mail');

type msgType = {
     to: {email: string, name: string}[],
    from: {email: string, name: string},
      subject: string,
      message_body: {
        type: string,
        value: string,
      },
}

export const notifyUser = async (msg: msgType) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY as string);
    const SG_config = {personalizations: [
        {
          to: msg.to,
          subject: msg.subject,
        },
      ],
      from: msg.from,
      content: [
       msg.message_body,
      ],
    };
    const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';
    const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL as string);
    try {
        await axios.post('https://api.sendgrid.com/v3/mail/send', SG_config, {headers: {'Authorization': `Bearer ${process.env.SENDGRID_KEY}`, 'Content-Type': 'application/json'}});
        return true;
    } catch (e:any) {
        await webhook.send({
            icon_emoji: ':male-police-officer:',
            text: `Reporting: Some went wrong when trying to send a mail 
                             Error: ${e}`,
        });
        return false;
    }
};

