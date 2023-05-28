import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {addPoints} from "../points";

export const firstTimeShopReview = functions
    .runWith({secrets: ["SENDGRID_KEY"]})
    .firestore.document("shops/{shopId}/reviews/{reviewId}")
    .onCreate(async (snap: any, context) => {
        const data = snap.data() as any;
        const shopId = context.params.shopId;
        const reviewId = context.params.reviewId;
        if (data.shop_id === reviewId) return;

        const shopRef = await admin.firestore().collection("shops").doc(shopId).get();
        const shopData = shopRef.data() as any;
        const updatedRating = updateRating(shopData.rating, data.rating);
        await admin.firestore().collection("shops").doc(shopId).collection("customers").doc(reviewId).set({
            ...data.user,
            note: 'Added from Reviews',
            source: 'INTERNAL',
            amount: 0,
        }, {merge: true});
        await admin.firestore().collection("shops").doc(shopId).set({rating: updatedRating}, {merge: true});
        addPoints("NEW_REVIEW", shopId);
    });

export const updatedShopReview = functions
    .runWith({secrets: ["SENDGRID_KEY"]})
    .firestore.document("shops/{shopId}/reviews/{reviewId}")
    .onUpdate(async (snap: any, context) => {
        const afterData = snap.after.data();
        const serviceId = context.params.shopId;
        const reviewId = context.params.reviewId;
        if (afterData.shop_id === reviewId) return;
        const shopRef = await admin.firestore().collection("shops").doc(serviceId).get();
        const shopData = shopRef.data() as any;
        const updatedRating = updateRating(shopData.rating, afterData.rating);
        await admin.firestore().collection("shops").doc(serviceId).set({rating: updatedRating}, {merge: true});
    });

export const firstTimeServiceReview = functions
    .runWith({secrets: ["SENDGRID_KEY"]})
    .firestore.document("services/{serviceId}/reviews/{reviewId}")
    .onCreate(async (snap: any, context) => {
        const data = snap.data() as any;
        const serviceId = context.params.serviceId;
        const reviewId = context.params.reviewId;
        if (data.service_id === reviewId) return;

        const serviceRef = await admin.firestore().collection("services").doc(serviceId).get();
        const serviceData = serviceRef.data() as any;
        const updatedRating = updateRating(serviceData.rating, data.rating);
        await admin.firestore().collection("services").doc(serviceId).collection("customers").doc(reviewId).set({
            ...data.user,
            source: 'INTERNAL',
            note: 'Added from Reviews',
        });
        await admin.firestore().collection("services").doc(serviceId).set({rating: updatedRating}, {merge: true});
        addPoints("NEW_REVIEW", serviceId);
    });

export const updatedServiceReview = functions
    .runWith({secrets: ["SENDGRID_KEY"]})
    .firestore.document("services/{serviceId}/reviews/{reviewId}")
    .onUpdate(async (snap: any, context) => {
        const afterData = snap.after.data();
        const serviceId = context.params.serviceId;
        const reviewId = context.params.reviewId;
        if (afterData.service_id === reviewId) return;
        const serviceRef = await admin.firestore().collection("services").doc(serviceId).get();
        const serviceData = serviceRef.data() as any;
        const updatedRating = updateRating(serviceData.rating, afterData.rating);
        await admin.firestore().collection("services").doc(serviceId).set({rating: updatedRating}, {merge: true});
    });


const updateRating = (formerRating = 0, newRating: number): number => {
    if (formerRating === 0) return newRating;
    const updatedRating = (formerRating + newRating) / 2;
    const roundedRating = Math.round(updatedRating * 10) / 10;
    const maxRating = Math.min(roundedRating, 5);
    return maxRating;
};
