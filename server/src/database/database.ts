const firebaseConfig = require('../configs/firebase');
const firebaseEnv = require('../../firebase-env.json');
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(firebaseEnv),
    databaseURL: "https://twitter-69cf3-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.firestore()
export { admin, db }