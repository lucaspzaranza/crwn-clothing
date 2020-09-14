import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyChYqpyPBrf_VEtPf2lFjsJeXncGWlPyCU",
  authDomain: "crwn-db-31b26.firebaseapp.com",
  databaseURL: "https://crwn-db-31b26.firebaseio.com",
  projectId: "crwn-db-31b26",
  storageBucket: "crwn-db-31b26.appspot.com",
  messagingSenderId: "942033808633",
  appId: "1:942033808633:web:cc5fc0865eeb3130e78628",
  measurementId: "G-9487CF9CXG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
