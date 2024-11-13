import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDv7IJtPwUGNpTQ-KO3ZILoMFbZ_8JVMO0",

  authDomain: "chatappcelebrities.firebaseapp.com",

  projectId: "chatappcelebrities",

  storageBucket: "chatappcelebrities.firebasestorage.app",

  messagingSenderId: "94822416091",

  appId: "1:94822416091:web:e7f83790d80afe12f7d6fe"

};


const app = createApp(App);

app.mount('#app');

// Initialize Firebase

const Firebaseapp = initializeApp(firebaseConfig);

const messaging = getMessaging(Firebaseapp);

getToken(messaging, {vapidKey: "BIwitLvpJOxocFqZBvjf1dZ-QqwFubEHrO-VtpIV2XUSP3zLJleSivH5CEMXOG2n1HJil8XjWtJRskhaPeZq8fM"}).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
