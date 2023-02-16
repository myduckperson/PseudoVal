// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut  } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

// const btn = document.querySelector("#btn");
// const btnS = document.querySelector("#btn");
// const sgn = document.querySelector("#leSign");
// const name = document.querySelector("#bruhName");
// const sName = document.querySelector("#bruhSName");

const signIn = document.querySelector("#signInOut");
const signUp = document.querySelector("#signUp");
const exit = document.querySelector("#exit");
const inputClass = document.querySelector("#class");
const greeting = document.querySelector("#greeting");

// localStorage loaders
const uidH = document.querySelector("#uid");
const nameH = document.querySelector("#Name");
const classH = document.querySelector("#Class");
const gradesH = document.querySelector("#grades");


const collection = "pseudoMain";
const tDoc = "template";
/* template:{
    Class: ""
    Name:""
    grades:0
    uid:""
}*/



signIn.addEventListener("click", signInScript);

signUp.addEventListener("click", signUpScript);

exit.addEventListener("click", exitF);


/* Зміна стану авторизації відбувається:
        при оновленні сторінки,
        при вході та виході, але не при повторному вході в той самий аккаунт
*/
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
onAuthStateChanged(auth, async (user) => {
    if (user) {
    // timer to slow down the function
    await timeout(1000);
        // User is signed in
        const uid = user.uid;
        console.log("Hello, " + user.displayName + "!");
        greeting.innerText = "Hello, " + user.displayName + "!";

        const localUid = localStorage.getItem("uid");
        const localName = localStorage.getItem("Name");
        const localClass = localStorage.getItem("Class");
        const localGrades = localStorage.getItem("grades");

        uidH.innerHTML += localUid;
        nameH.innerHTML += localName;
        classH.innerHTML += localClass;
        gradesH.innerHTML += localGrades;

        // AUTHSTATECHANGED IS FASTER THAN SIGNUP/SIGNIN FUNCTION 
    } else {
        // User is signed out
        console.log("Hello, stranger!");
        greeting.innerText = "Hello, stranger!";

        uidH.innerHTML = "Your uid is: ";
        nameH.innerHTML = "Your name is: ";
        classH.innerHTML = "Your class is: ";
        gradesH.innerHTML = "Your grades are: ";
    }
});
  











async function signUpScript() {
    signInWithPopup(auth, provider)
    .then(async result => {

        /* result structure:{
            operationType: "signIn"
            providerId: "google.com"
            user: {
                accessToken:"eyJhbGci...."
                auth:We {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, config: {…}, currentUser: Ae, emulatorConfig: null, …}
                displayName:"Mars Driver"
                email:"illarionov0405@gmail.com"
                emailVerified:true
                isAnonymous:false
                metadata:Te {createdAt: '1639602010185', lastLoginAt: '1676557389839', lastSignInTime: 'Thu, 16 Feb 2023 14:23:09 GMT', creationTime: 'Wed, 15 Dec 2021 21:00:10 GMT'}
                phoneNumber:null
                photoURL:"https://lh3.googleusercontent.com/a-/AOh14Gi9qOpJDk0WCakRazSDE6PVNirm1aeD8Y7zJjw2=s96-c"
                proactiveRefresh:ye {user: Ae, isRunning: false, timerId: null, errorBackoff: 30000}
                providerId:"firebase"
                reloadListener:null
                reloadUserInfo:{localId: 'dvkRF5fyZZSdUoh9Cb99iq1gH0L2', email: 'illarionov0405@gmail.com', displayName: 'Mars Driver', photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Gi9qOpJDk0WCakRazSDE6PVNirm1aeD8Y7zJjw2=s96-c', emailVerified: true, …}
                stsTokenManager:ke {refreshToken: 'APJWN8cPN3fv_pX0pcY86PQbqR-d0nqX-rMj9ELdusqZxM82_n…9xiUsiATPriMB_fyvn6D9cgTSHXFZaWFLT0nSl_pi65b67dwg', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYjMxMjdiMjRjZTg2MD…Mejx7YfZXVWvxZI1SPQERbRkAJSXOt0GoNNCSCpf_q4DrNfjw', expirationTime: 1676561089348}
                tenantId:null
                uid:"dvkRF5fyZZSdUoh9Cb99iq1gH0L2"
            }
        }*/

        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        const user = result.user;
        const uid = user.uid;
        const name = user.displayName;
        const userClass = inputClass.value;

        // reading a template document without checking whether it exists or not
        const docRef = doc(db, collection, tDoc);
        const docSnap = (await getDoc(docRef)).data();

        // setting user's info into the template doc
        docSnap.uid = uid;
        docSnap.Name = name;
        docSnap.Class = userClass;

        // sending a filled doc to firestore with a name of uid
        await setDoc(doc(db, collection, uid), docSnap);

        // sending a filled to localStorage
        localStorage.setItem("uid", uid);
        localStorage.setItem("Name", name);
        localStorage.setItem("Class", userClass);
        localStorage.setItem("grades", docSnap.grades);

        // console.log(docSnap.data());
        console.log(user.displayName);

    }).catch(async error => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(error, errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
})}







async function signInScript() {
    signInWithPopup(auth, provider)
    .then(async result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const name = user.displayName;
        const uid = user.uid;
        const userDoc = (await getDoc(doc(db, collection, tDoc))).data();
        localStorage.setItem("uid", uid);
        localStorage.setItem("Name", name);
        localStorage.setItem("Class", userDoc.Class);
        localStorage.setItem("grades", userDoc.grades);

    }).catch(async error => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(error, errorCode);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
})}



async function exitF(){
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("bye");
        localStorage.clear();
      }).catch((error) => {
        // An error happened.
      });
      
}






































