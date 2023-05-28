import {TransferDataType} from './types';
import * as admin from 'firebase-admin';
import {koboToNaira} from '../../utils';


export const transferReversed = async (data: TransferDataType) => {
  const uid = data?.recipient?.metadata?.id;
    const transactionSnapshot = await admin.firestore().collection('wallets').doc(uid).get();
    if (transactionSnapshot.exists) {
        await admin
            .firestore()
            .collection('wallets').doc(uid).collection('transactions').doc(data.reference).update({status: 'REVERSED'});
    }
      await admin
            .firestore()
            .collection('wallets').doc(uid).update({balance: admin.firestore.FieldValue.increment(koboToNaira(data.amount))});
    return {msg: `Success`, code: 200};
};
