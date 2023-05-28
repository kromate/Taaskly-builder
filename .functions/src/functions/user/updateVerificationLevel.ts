import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


import {IncomingWebhook} from '@slack/webhook';


export const updateVerificationLevel = functions
	.region('us-central1')
	.https.onCall(async (data: any, context: any) => {
		const level = data.level;
		const uid = context?.auth?.uid;
		const name = context?.auth?.token?.name;
		// const email = context?.auth?.token?.email;
		const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
		const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL as string);
		if (!(typeof level === 'number') || level > 2) {
			throw new functions.https.HttpsError(
				'invalid-argument',
				'The function must be called with ' +
				'one arguments "level" containing the level number'
			);
		}

		if (!context.auth) {
			throw new functions.https.HttpsError(
				'failed-precondition',
				'The function must be called ' + 'while authenticated.'
			);
		}
		await webhook.send({
			icon_emoji: ':male-police-officer:',
			text: `Hi admins,  user ${name} with ID of ${uid} is requesting to be verified`,
		});
		await admin
			.firestore()
			.collection('users')
			.doc(uid as string)
			.update({verified_level: level})
			.then(() => {
				return {level: `Verification level updated to ${level} successfully`};
			});

		return {msg: `Verification level updated to ${level} successfully`, code: 200};
	});
