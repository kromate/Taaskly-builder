import * as admin from 'firebase-admin';
import {koboToNaira} from '../../utils';
import {TransferDataType} from './types';
type statusType = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REVERSED';

export const transferSuccess = async (data: TransferDataType) => {
  const uid = data?.recipient?.metadata?.id;
  const transactionSnapshot = await admin.firestore().collection('wallets').doc(uid).get();
  if (transactionSnapshot.exists) {
  await admin
    .firestore()
    .collection('wallets').doc(uid).collection('transactions').doc(data.reference).update({status: 'SUCCESS'});
  } else {
    await admin
      .firestore()
      .collection('wallets').doc(uid).collection('transactions').doc(data.reference).create({desc: 'Transfer out of user Wallet', type: 'DEBIT', status: 'SUCCESS' as statusType, channel: 'WALLET', amount: koboToNaira(data.amount), created_at: new Date().toISOString(), meta: data});
  }
};
