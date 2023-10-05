import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdE3zaC4__VoAgn0k2vs-LY17rjsT3lHw",
  authDomain: "apcs-seazle.firebaseapp.com",
  databaseURL: "https://apcs-seazle-default-rtdb.firebaseio.com",
  projectId: "apcs-seazle",
  storageBucket: "apcs-seazle.appspot.com",
  messagingSenderId: "11225254826",
  appId: "1:11225254826:web:e00e459c05bc86eaadb9d3",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
