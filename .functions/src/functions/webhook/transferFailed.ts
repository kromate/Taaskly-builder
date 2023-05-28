import {TransferDataType} from './types';
import * as admin from 'firebase-admin';
import {koboToNaira} from '../../utils';
// type statusType = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REVERSED';


export const transferFailed = async (data: TransferDataType) => {
    const uid = data?.recipient?.metadata?.id;
    const transactionSnapshot = await admin.firestore().collection('wallets').doc(uid).get();
    if (transactionSnapshot.exists) {
        await admin
            .firestore()
            .collection('wallets').doc(uid).collection('transactions').doc(data.reference).update({status: 'FAILED'});
    }
      await admin
            .firestore()
            .collection('wallets').doc(uid).update({balance: admin.firestore.FieldValue.increment(koboToNaira(data.amount))});
    return {msg: `Success`, code: 200};
};

// export const transferSuccess = async (data: TransferDataType) => {
//   const uid = data?.recipient?.metadata?.id;
//   const transactionSnapshot = await admin.firestore().collection('wallets').doc(uid).get();
//   if (transactionSnapshot.exists) {
//   await admin
//     .firestore()
//     .collection('wallets').doc(uid).collection('transactions').doc(data.reference).update({status: 'SUCCESS'});
//   } else {
//     await admin
//       .firestore()
//       .collection('wallets').doc(uid).collection('transactions').doc(data.reference).create({desc: 'Transfer out of user Wallet', type: 'DEBIT', status: 'SUCCESS' as statusType, channel: 'WALLET', amount: koboToNaira(data.amount), created_at: new Date().toISOString(), meta: data});
//   }
// };
