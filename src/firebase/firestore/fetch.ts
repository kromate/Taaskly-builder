import { Ref } from 'vue'
import { doc, onSnapshot, getDoc, limit, collection, query } from 'firebase/firestore'
import { db } from '../init'

const FETCHLIMIT = 300

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
	ArrayRef: Ref<Array<any>>,
	findFn = (item, change) => item.id === change.id
) => {
	const collectionRef = collection(db, collectionName)
	// const q = query(collectionRef)
	const q = query(collectionRef, limit(FETCHLIMIT))

	return new Promise((resolve) => {
		onDataRefChange(resolve, q, ArrayRef, findFn)
	})
}

export const getFirestoreSubCollection = async (
	collectionName: string,
	documentName: string,
	subCollectionName: string,
	ArrayRef: Ref<Array<any>>,
	findFn = (item, change) => item.id === change.id
) => {
	const collectionRef = collection(db, collectionName, documentName, subCollectionName)
	// const q = query(collectionRef)
	const q = query(collectionRef, limit(FETCHLIMIT))

	return new Promise((resolve) => {
		onDataRefChange(resolve, q, ArrayRef, findFn)
	})
}

const onDataRefChange = (resolve, q, ArrayRef, findFn) => {
	const unsub = onSnapshot(q, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
				const existingItem = ArrayRef.value.find((item) => findFn(item, change.doc.data()))
                if (!existingItem) {
					ArrayRef.value.push(change.doc.data())
				}
            } else if (change.type === 'modified') {
                const index = ArrayRef.value.findIndex((item) => findFn(item, change.doc.data()))
                if (index !== -1) {
                    ArrayRef.value[index] = change.doc.data()
                }
            } else if (change.type === 'removed') {
                ArrayRef.value = ArrayRef.value.filter((item) => !findFn(item, change.doc.data()))
            }
		})

        resolve(ArrayRef.value)
	})
}
