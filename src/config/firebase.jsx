
import { initializeApp } from "firebase/app";
 import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "mumble-talk-845e7.firebaseapp.com",
  projectId: "mumble-talk-845e7",
  storageBucket: "mumble-talk-845e7.appspot.com",
  messagingSenderId: "436476197643",
  appId: "1:436476197643:web:eac1bf76409082ed57c00e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)




