import * as functions from "firebase-functions";
import {addPoints} from "../points";


export const onProductCreation = functions
    .runWith({secrets: ["SENDGRID_KEY", "SLACK_WEBHOOK_URL"]})
    .firestore.document("shops/{shopId}/products/{productId}")
    .onCreate(async (snap: any, context:any) => {
        const shopId = context.params.shopId;
        addPoints('NEW_PRODUCT', shopId);
    });
