import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


export const showcaseImgDeletion = functions.firestore
    .document('services/{serviceId}/showcases/{showcaseId}')
    .onDelete(async (snap, context) => {
        const showcaseData = snap.data();
        const serviceId = context.params.serviceId;
        const showcaseId = context.params.showcaseId;

        if (showcaseData.type === 'IMAGE') {
            try {
                const id = showcaseData.reference.split('%2F')[3].split('?')[0];
                return await admin.storage().bucket().file(`services/${serviceId}/showcases/${showcaseId}/${id}`).delete();
            } catch (e) {
                console.log(e);
                return false;
            }
        }
        return;
    });
