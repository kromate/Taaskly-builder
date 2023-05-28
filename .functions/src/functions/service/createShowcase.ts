import * as functions from "firebase-functions";
import {addPoints} from "../points";


export const onShowcaseCreation = functions
    .runWith({secrets: ["SENDGRID_KEY", "SLACK_WEBHOOK_URL"]})
    .firestore.document("services/{serviceId}/showcases/{showcaseId}")
    .onCreate(async (snap: any, context:any) => {
        const serviceId = context.params.serviceId;
        addPoints('NEW_PRODUCT', serviceId);
    });
