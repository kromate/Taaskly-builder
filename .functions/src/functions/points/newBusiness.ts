import * as admin from "firebase-admin";
import {scoreAdder, scoreKeeper} from "./helper";


const BUSINESS_POINT = 5;

export const new_business = async (username: string) => {
    const userRef = await admin.firestore().collection('usernames').doc(username).get();
    const business_count = userRef.data()?.business_count;
    if (!business_count) {
        await admin.firestore().collection('usernames').doc(username).set({business_count: 1}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({business_count: admin.firestore.FieldValue.increment(1)}, {merge: true});
    }
        await scoreAdder(username, BUSINESS_POINT);
        await scoreKeeper(username, {type: 'CREATE_BUSINESS', point: BUSINESS_POINT, date: new Date()});
};

