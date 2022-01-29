import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLUIYKfP5McDxfX8c4hoWYZeSzwJTBEJM",
  authDomain: "heka-entrega-react.firebaseapp.com",
  projectId: "heka-entrega-react",
  storageBucket: "heka-entrega-react.appspot.com",
  messagingSenderId: "840838588997",
  appId: "1:840838588997:web:c18b64aca38eb51eea512c"
};

const dfb = initializeApp(firebaseConfig);

export const dbFirestore = getFirestore(dfb)
export const dbAuth = getAuth(dfb)