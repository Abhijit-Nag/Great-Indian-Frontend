// Import the functions you need from the SDKs you need
import axios from "axios";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig={
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "great-indian-993d0.firebaseapp.com",
    projectId: "great-indian-993d0",
    storageBucket: "great-indian-993d0.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider= new GoogleAuthProvider();
// const url="http://localhost:8000";
const url = process.env.REACT_APP_SERVER_API_KEY;

export const signInWithGoogle=()=>{
    signInWithPopup(auth, provider).then(async(result)=>{
        console.log(result);
        console.log(`this firebase api key : ${process.env.REACT_APP_FIREBASE_API_KEY}`);
        const fullName= result.user.displayName;
        const email= result.user.email;
        const photoUrl= result.user.photoURL;
        const firstname=fullName.split(" ")[0];
        const lastname=fullName.split(" ")[1];
        const username=(firstname+lastname).toLowerCase();
        window.localStorage.setItem("firstname", firstname);
        window.localStorage.setItem("lastname", lastname);
        window.localStorage.setItem("username", username);
        window.localStorage.setItem("email", email);
        window.localStorage.setItem("photoUrl", photoUrl);
        const phone=111111111;
        const password="something";
        const existingUserCheck= await axios.post(`${url}/logingoogle`,
        {
            email:email
        });
        console.log(`userChecking: ${existingUserCheck}`);
        if(!existingUserCheck.data.success){

            const response= await axios.post(`${url}/signupgoogle`, {
                firstname:firstname,
                lastname:lastname,
                username:username,
                email:email,
                password:password,
                phone:phone
                
            })
            console.log(response);

            let user= await axios.post(`${url}/logingoogle`,{
                email:email
            });
            user=user.data.data;
            console.log(` user data after calling logingoogleapi: ${user}`)
            const userId= user._id;
            window.localStorage.setItem("userId", userId);
        }
        else{
            window.localStorage.setItem("userId", existingUserCheck.data.data._id);
        }
        window.location.reload("/");

    }).catch((error)=>console.log(error));
}