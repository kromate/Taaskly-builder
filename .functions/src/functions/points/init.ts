import * as admin from "firebase-admin";
import {new_review} from "./newReview";
import {PointType} from './helper';
import {new_referral} from "./newReferral";
import {new_business} from './newBusiness';
import {new_ref_business} from "./referredBusiness";
import {new_product} from "./newProduct";


export const addPoints = async (type: PointType, Id: string, idType: 'id' | 'username' = 'id') => {
    let username;
    if (idType === 'username') {
        username = Id;
    } else {
        username = await admin.firestore().collection('users').doc(Id).get().then((doc) => doc.data()?.username);
    }


    switch (type) {
        case 'USER_REFERRAL':
            new_referral(username);
            break;
        case 'NEW_PRODUCT':
            new_product(username);
            break;
        case 'NEW_REVIEW':
            new_review(username);
            break;
        case 'BUSINESS_REFERRAL':
            new_ref_business(username);
            break;
        case 'CREATE_BUSINESS':
            new_business(username);
            break;
        default:
            break;
    }
};


