import * as functions from "firebase-functions";
import {addPoints} from "../points";
import * as admin from "firebase-admin";

export const onServiceCreation = functions
    .runWith({secrets: ["SENDGRID_KEY", "SLACK_WEBHOOK_URL"]})
    .firestore.document("services/{serviceId}")
    .onCreate(async (snap: any, _:any) => {
        const dataValues = snap.data();
        addPoints('CREATE_BUSINESS', dataValues?.user_id);

        const Referral = await admin.firestore().collection('users').doc(dataValues?.user_id as string).get().then((doc) => doc.data()?.referrer);
        if (Referral) addPoints('BUSINESS_REFERRAL', Referral, 'username');
    });
