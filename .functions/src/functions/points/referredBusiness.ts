import * as admin from "firebase-admin";
import {scoreAdder, scoreKeeper} from "./helper";


const REF_BUSINESS_POINT = 5;

export const new_ref_business = async (username: string) => {
    const userRef = await admin.firestore().collection('usernames').doc(username).get();
    const ref_business_count = userRef.data()?.ref_business_count;
    if (!ref_business_count) {
        await admin.firestore().collection('usernames').doc(username).set({ref_business_count: 1}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({ref_business_count: admin.firestore.FieldValue.increment(1)}, {merge: true});
    }
        await scoreAdder(username, REF_BUSINESS_POINT);
        await scoreKeeper(username, {type: 'BUSINESS_REFERRAL', point: REF_BUSINESS_POINT, date: new Date()});
};

