import * as admin from "firebase-admin";
import {scoreAdder, scoreKeeper} from "./helper";


const PRODUCT_POINT = 3;

export const new_product = async (username: string) => {
    const userRef = await admin.firestore().collection('usernames').doc(username).get();
    const product_count = userRef.data()?.product_count;
    if (!product_count) {
        await admin.firestore().collection('usernames').doc(username).set({product_count: 1}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({product_count: admin.firestore.FieldValue.increment(1)}, {merge: true});
    }
    if (product_count <= 5) {
        await scoreAdder(username, PRODUCT_POINT);
         await scoreKeeper(username, {type: 'NEW_PRODUCT', point: PRODUCT_POINT, date: new Date()});
    }
};

