import * as admin from "firebase-admin";
import {scoreAdder, scoreKeeper} from "./helper";


const REFERRAL_POINT = 10;

export const new_referral = async (username: string) => {
    const userRef = await admin.firestore().collection('usernames').doc(username).get();
    const referral_count = userRef.data()?.referral_count;
    if (!referral_count) {
        await admin.firestore().collection('usernames').doc(username).set({referral_count: 1}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({referral_count: admin.firestore.FieldValue.increment(1)}, {merge: true});
    }
        await scoreAdder(username, REFERRAL_POINT);
        await scoreKeeper(username, {type: 'USER_REFERRAL', point: REFERRAL_POINT, date: new Date()});
};

