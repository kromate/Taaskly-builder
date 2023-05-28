import * as admin from "firebase-admin";
import {v4 as uuidv4} from 'uuid';


export type PointType = 'USER_REFERRAL' | 'NEW_PRODUCT' | 'NEW_REVIEW' | 'BUSINESS_REFERRAL' | 'CREATE_BUSINESS';

export const scoreAdder = async (username: string, score: number) => {
    const userRef = await admin.firestore().collection('usernames').doc(username).get();
    const currentDateRef = `${new Date().toISOString().split('T')[0].substring(0, 7)}_score`;

    const taaskly_score = userRef.data()?.taaskly_score;
    const currentDate_score = userRef.data()?.[currentDateRef];

    if (!taaskly_score) {
        await admin.firestore().collection('usernames').doc(username).set({taaskly_score: score}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({taaskly_score: admin.firestore.FieldValue.increment(score)}, {merge: true});
    }

    if (!currentDate_score) {
        await admin.firestore().collection('usernames').doc(username).set({[currentDateRef]: score}, {merge: true});
    } else {
        await admin.firestore().collection('usernames').doc(username).set({[currentDateRef]: admin.firestore.FieldValue.increment(score)}, {merge: true});
    }
};

export const scoreKeeper = async (username: string, data: {type:PointType, point:number, date: Date,}) => {
    await admin.firestore().collection('usernames').doc(username).collection('points').doc(uuidv4()).set(data);
    await admin.firestore().collection('points').doc(uuidv4()).set({...data, username});
};
