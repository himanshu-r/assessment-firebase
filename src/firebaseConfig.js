
import { initializeApp } from "firebase/app";
import {getAuth} from  'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCeQ_lrMgw_SPs_3uIAqD8aLYzY9WHGpCs",
  authDomain: "testprojecy-ae7c0.firebaseapp.com",
  projectId: "testprojecy-ae7c0",
  storageBucket: "testprojecy-ae7c0.appspot.com",
  messagingSenderId: "546083267015",
  appId: "1:546083267015:web:e4f51cd3513c02319d79e2",
  measurementId: "G-THKHDEKMLJ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth}; 