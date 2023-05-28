import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// Define the Cloud Function that triggers when a document is deleted
export const preventDocDeleteWithSubcollections = functions.firestore
  .document('tasks/{taskId}')
  .onDelete(async (snap, _) => {
    const parentCollectionRef = snap.ref;
    const collections = await parentCollectionRef.listCollections();

    const hasSubcollectionWithDocuments = await Promise.all(
      collections.map((collection) =>
        collection.get().then((documents) => !documents.empty),
      ),
    ).then((results) => results.some(Boolean));

    if (hasSubcollectionWithDocuments) {
      return snap.ref.set(snap.data()!);
    }

    return;
  });

// export const preventDocUpdateWithSubcollections = functions.firestore
//   .document('tasks/{taskId}')
//   .onUpdate(async (snap, _) => {
//      const beforeData = snap.before.data();
//     const afterData = snap.after.data();
//     if (
//     checkEquality(beforeData.desc, afterData.desc) ||
//     checkEquality(beforeData.start_date, afterData.start_date) ||
//     checkEquality(beforeData.end_date, afterData.end_date) ||
//     checkEquality(beforeData.price, afterData.price)
//     ) {
//       const subcollectionRef = admin.firestore().collection('tasks').doc(beforeData.id).collection('offers');
//       const acceptedDocs = await subcollectionRef.where('status', '==', 'ACCEPTED').limit(1).get();
//       if (acceptedDocs.empty) {
//         return;
//       } else {
//     const parentCollectionRef = snap.before.ref;
//     const collections = await parentCollectionRef.listCollections();

//     const hasSubcollectionWithDocuments = await Promise.all(
//       collections.map((collection) =>
//         collection.get().then((documents) => !documents.empty),
//       ),
//     ).then((results) => results.some(Boolean));

//     if (hasSubcollectionWithDocuments) {
//       return snap.before.ref.set(snap.before.data()!);
//     }
//       }
//     }
//     return;
//   });


// const checkEquality = (value1: any, value2: any): boolean =>{
//   return value1 === value2;
// };
