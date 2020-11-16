import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBkFuaoGuQ6D-LPDiib-OdbLUu6riuc7fg",
    authDomain: "whatsapp-clone-19018.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-19018.firebaseio.com",
    projectId: "whatsapp-clone-19018",
    storageBucket: "whatsapp-clone-19018.appspot.com",
    messagingSenderId: "999271643464",
    appId: "1:999271643464:web:e4a020612ae4a2bc205b7d",
    measurementId: "G-HBL58P0CSZ"
  };
   
const  firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();//google authentication

export {auth,provider};
export default db;