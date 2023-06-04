// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
    webClientId: '389761954341-8i87lgfsivl30mgefps716se68mc8gil.apps.googleusercontent.com'
})

export {GoogleSignin}
export {firestore}
export {auth}