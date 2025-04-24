// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

import { initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore 
import { getReactNativePersistence } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.EXPO_PUBLIC_AUTH_DOMAIN
const projectId = process.env.EXPO_PUBLIC_PROJECT_ID
const storageBucket = process.env.EXPO_PUBLIC_STORAGE_BUCKET
const messagingSenderId = process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID
const appId = process.env.EXPO_PUBLIC_APP_ID
const measurementId = process.env.EXPO_PUBLIC_MEASUREMENT_ID


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

export const db = getFirestore(app);
const analytics = getAnalytics(app);