import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSWL142TTJJx_TfaYG6RSKLXM2GwAJo4g",
  authDomain: "cs300-nftmarketplace.firebaseapp.com",
  databaseURL: "https://apcs-seazle-default-rtdb.firebaseio.com",
  projectId: "cs300-nftmarketplace",
  storageBucket: "cs300-nftmarketplace.appspot.com",
  messagingSenderId: "480564484054",
  appId: "1:480564484054:web:90c9dc17a12c40a03a7677"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

