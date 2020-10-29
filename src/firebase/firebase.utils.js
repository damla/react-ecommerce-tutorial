import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyATsaO4mbq4arGJb5HOFi6wkcIhJY-Ze64",
  authDomain: "ecommerce-db-e707e.firebaseapp.com",
  databaseURL: "https://ecommerce-db-e707e.firebaseio.com",
  projectId: "ecommerce-db-e707e",
  storageBucket: "ecommerce-db-e707e.appspot.com",
  messagingSenderId: "427532124034",
  appId: "1:427532124034:web:96f4cf4ddf7ab24658999b",
};
// additional daha sonra signup icin kullanilabilir
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // if it doesnt exist, return nothing

  const userRef = firestore.doc(`users/${userAuth.uid}`); // random userID
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    // data yoksa yeni kullanici yarat

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

/* fireStore returns two types of object => references & snapshots [mutlaka obje return eder]
 *
 * References:
 * queryReference object "current" database icerisinde queryledigimiz verinin nerede oldugunu belirtir.
 * firestore.doc('/users/:userId); // returns documentSnapshot
 * - CRUD METHODLARI SAGLAR [.set(), .get(), .update(), .delete()]
 *
 * firestore.collections('/users'); // returns querySnapshot
 * - ADD METHODUNU SAGLAR [ .add() ]
 *
 * Asil dataya degil, onun hakkinda bilgilere, detaylara sahiptir.
 * Ya da, snapshot'a ulasabilmemiz icin get methodunu saglar. [ .get() ]
 *
 *
 *
 *
 */

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore(); // db

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
