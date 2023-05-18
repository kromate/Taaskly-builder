import { Ref } from 'vue'
import { doc, onSnapshot, getDoc, limit, collection, query } from 'firebase/firestore'
import { db } from '../init'

const FETCHLIMIT = 1000

export const getSingleFirestoreDocument = async (
	collection: string,
	id: string
) => {
	const singleDocumentRef = doc(db, collection, id)
	const docSnap = await getDoc(singleDocumentRef)
	if (docSnap.exists()) {
		return docSnap.data() as any
	} else {
		return null
	}
}
export const getSingleFirestoreSubDocument = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	id: string
) => {
	const singleDocumentRef = doc(db, collectionName, documentName, subCollectionName, id)
	const docSnap = await getDoc(singleDocumentRef)
	if (docSnap.exists()) {
		return docSnap.data() as any
	} else {
		return null
	}
}

export const getFirestoreCollection = async (
	collectionName: string,
	ArrayRef: Ref<Array<any>>
) => {
	const collectionRef = collection(db, collectionName)
	const q = query(collectionRef)
	// const q = query(collectionRef, limit(FETCHLIMIT))

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

export const getFirestoreSubCollection = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	ArrayRef: Ref<Array<any>>
) => {
	const collectionRef = collection(db, collectionName, documentName, subCollectionName)
	const q = query(collectionRef)
	// const q = query(collectionRef, limit(FETCHLIMIT))

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
