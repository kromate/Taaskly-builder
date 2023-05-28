import * as admin from "firebase-admin";
import {scoreAdder, scoreKeeper} from "./helper";


const REVIEW_POINT = 2;

export const new_review = async (username: string) => {
    const userRef = await admin.firestore().collection('usernames').doc(username).get();
    const review_count = userRef.data()?.review_count;
    if (!review_count) {
        await admin.firestore().collection('usernames').doc(username).set({review_count: 1}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({review_count: admin.firestore.FieldValue.increment(1)}, {merge: true});
    }
    if (review_count <= 5) {
        await scoreAdder(username, REVIEW_POINT);
         await scoreKeeper(username, {type: 'NEW_REVIEW', point: REVIEW_POINT, date: new Date()});
    }
};

