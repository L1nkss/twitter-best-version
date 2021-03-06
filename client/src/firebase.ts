import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  setDoc, doc,
} from 'firebase/firestore'

import { deleteCookie } from '@shared/utils/cookies'
import { makeRandomString } from '@shared/utils/makeRandomString'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({prompt: 'select_account'})

export const firebaseDB = getFirestore(app)
export default app

export const signInWithGoogle = async (): Promise<void> => {
  try {
    const response = await signInWithPopup(auth, googleProvider)
    const user = response.user
    const q = query(
      collection(firebaseDB, 'users'),
      where('uid', '==', user.uid)
    )
    const documents = await getDocs(q)

    if (documents.empty) {
      await setDoc(doc(firebaseDB, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
        createdAt: new Date(),
        nickName: makeRandomString(10),
        isVerify: user.emailVerified,
        avatarUrl: user.photoURL,
      })
    }
  } catch (err) {
    console.log('SIGN IN ERROR', err)
  }
}

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await setDoc(doc(firebaseDB, 'users', user.uid), {
      uid: user.uid,
      name,
      nickName: makeRandomString(10),
      isVerify: false,
      createdAt: new Date(),
      authProvider: 'local',
      email,
    })
  } catch (err) {
    console.error(err)
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    deleteCookie('userAuth')
  } catch (e) {
  }
}

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    throw new Error();
  }
}

export const getFromDataFromFirestore = async <T>(
  name: string,
  selector: string,
  field = 'uid'
): Promise<T | undefined> => {
  try {
    const collectionRef = collection(firebaseDB, name)
    const q = query(collectionRef, where(field, '==', selector))
    const documents = await getDocs(q)

    let firestoreData: T | undefined = undefined

    documents.forEach((document) => {
      firestoreData = document.data() as T
    })

    return firestoreData
  } catch (e) {
  }
}
