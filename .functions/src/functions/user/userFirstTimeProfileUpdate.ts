import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {IncomingWebhook} from "@slack/webhook";
import {welcomeMsg} from "../../templates/user/welcome";
import {referralMsg} from "../../templates/user/referral";
import {notifyUser} from '../../helpers/index';
import {addPoints} from "../points";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sdk = require("api")("@sendchamp/v1.0#51pps210ld63tam2");
// SENDGRID_KEY

export const userFirstTimeProfileUpdate = functions
  .runWith({secrets: ["SENDGRID_KEY", "SLACK_WEBHOOK_URL"]})
  .firestore.document("users/{user_id}")
  .onCreate(async (snap: any) => {
    sdk.auth(`Bearer ${process.env.SENDGRID_KEY}`);
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL as string);
    const dataValues = snap.data();
    const uid = dataValues.id;
    const referrer = dataValues.referrer;
    const created_at = dataValues.created_at;
    const username = dataValues.username;
    const phone = dataValues.phone;
    const name = dataValues.first_name + " " + dataValues.last_name;

    const first_name = dataValues.username;
    const email = dataValues.email;

    const msg = welcomeMsg(email, first_name);
    await admin.firestore().collection("usernames").doc(username).create({id: uid, username: username, email: email});
    await admin.firestore().collection("wallets").doc(uid).create({balance: 0, id: uid, created_at: new Date().toISOString(), updated_at: new Date().toISOString()});
    await admin.auth().setCustomUserClaims(dataValues.id, {
      hasUpdatedProfile: true,
      username: username,
    });
    webhook.send({
      icon_emoji: ":male-police-officer:",
      text: `Hi admins, ${first_name} with the ID of ${dataValues.id} just signed up`,
    });
    notifyUser(msg);

    if (referrer) {
      const referralExist = await admin.firestore().collection('usernames').doc(referrer).get();
      if (referralExist.exists) {
        await admin
          .firestore()
          .collection("usernames")
          .doc(referrer)
          .collection("referrals")
          .doc(uid)
          .create({
            id: uid,
            username: username,
            email: email,
            created_at: created_at,
            name: name,
            amount: 0,
          });

        const userRef = await admin.firestore().collection("usernames").doc(referrer).get();
        const userEmail = userRef.data()?.email;
        const userName = userRef.data()?.username;
        const refMsg = referralMsg(userEmail, userName, username, phone);
        await notifyUser(refMsg);
        addPoints("USER_REFERRAL", referrer, 'username');
      }
    }

    return {msg: `Success`, code: 200};
  });
