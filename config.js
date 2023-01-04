import { initializeApp } from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDwUrvnlZi-HP4OWlMLb1wSjYlhg0ZsLws",
    authDomain: "studyapp-9affc.firebaseapp.com",
    databaseURL: "https://studyapp-9affc-default-rtdb.firebaseio.com",
    projectId: "studyapp-9affc",
    storageBucket: "studyapp-9affc.appspot.com",
    messagingSenderId: "761005449342",
    appId: "1:761005449342:web:bbddde1c2b80e40f05782f"
  };


  // Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;