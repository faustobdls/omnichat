
import * as admin from 'firebase-admin';

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? '');


const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
})
const firestore = admin.firestore(app)
// firestore.settings({
//     host: "localhost:8080",
//     ssl: false
// })


export { firestore, admin }