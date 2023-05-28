import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


export const productImgDeletion = functions.firestore
    .document('shops/{shopId}/products/{productId}')
    .onDelete(async (snap, context) => {
        const productData = snap.data();
        const shopId = context.params.shopId;
        const productId = context.params.productId;

        const photoArray = productData.photo_array;
        if (photoArray.length > 0) {
            try {
                photoArray.forEach(async (photo: any) => {
                  const id = photo.split('%2F')[4].split('?')[0];
                 await admin.storage().bucket().file(`shops/${shopId}/products/${productId}/${id}`).delete();
            });
            } catch (e) {
                console.log(e);
            }
        }
    });
