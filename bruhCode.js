// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC6s_8U18Lo6t6OauWP_kpf0y0bpFThCrk",
  authDomain: "csvalidation-e182e.firebaseapp.com",
  projectId: "csvalidation-e182e",
  storageBucket: "csvalidation-e182e.appspot.com",
  messagingSenderId: "351738632285",
  appId: "1:351738632285:web:ae96a0a6d490cd3e5f15b4",
  measurementId: "G-973D5PX7XX"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(auth);
const db = getFirestore(app);

const btn = document.querySelector("#btn");
const btnS = document.querySelector("#btn");
const sgn = document.querySelector("#leSign");
const name = document.querySelector("#bruhName");
const sName = document.querySelector("#bruhSName");


btn.addEventListener("click", async function() {signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        sgn.innerText = user.displayName;
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(error, errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
})}, {once: true});


onAuthStateChanged(auth, (user) => {
    if (user) {
        sgn.innerText = user.displayName;
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
    } else {
        sgn.innerText = "Le sign";
    // User is signed out
    // ...
    }
});












