import { Ref } from 'vue'
import {	onSnapshot, limit, collection, query, where } from 'firebase/firestore'
import { db } from '../init'

const FETCHLIMIT = 20

export const getFirestoreCollectionWithWhereQuery = async (
	collectionName: string,
	ArrayRef: Ref<Array<any>>,
	Query: { name:string, operator:any, value:any }
) => {
	const collectionRef = collection(db, collectionName)
	const q = query(collectionRef, limit(FETCHLIMIT), where(Query.name, Query.operator, Query.value))

	return new Promise((resolve) => {
		const unsub = onSnapshot(q, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === 'added') {
				ArrayRef.value.push(change.doc.data())
			}
			if (change.type === 'modified') {
				const changedArray = ArrayRef.value.filter(
					(item) => item.id !== change.doc.data().id
				)
				ArrayRef.value = [...changedArray, change.doc.data()]
			}
			if (change.type === 'removed') {
				const changedArray = ArrayRef.value.filter(
					(item) => item.id !== change.doc.data().id
				)
				ArrayRef.value = changedArray
			}
		})
			resolve(ArrayRef.value)
	})
	})
}

export const getFirestoreSubCollectionWithWhereQuery = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	ArrayRef: Ref<Array<any>>,
	Query: { name:string, operator:any, value:any }
) => {
	const collectionRef = collection(db, collectionName, documentName, subCollectionName)
	const q = query(collectionRef, where(Query.name, Query.operator, Query.value))

	return new Promise((resolve) => {
		const unsub = onSnapshot(q, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === 'added') {
				ArrayRef.value.push(change.doc.data())
			}
			if (change.type === 'modified') {
				const changedArray = ArrayRef.value.filter(
					(item) => item.id !== change.doc.data().id
				)
				ArrayRef.value = [...changedArray, change.doc.data()]
			}
			if (change.type === 'removed') {
				const changedArray = ArrayRef.value.filter(
					(item) => item.id !== change.doc.data().id
				)
				ArrayRef.value = changedArray
			}
		})
			resolve(ArrayRef.value)
	})
	})
}
