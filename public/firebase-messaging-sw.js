importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

const firebaseConfig = {

  apiKey: "AIzaSyDv7IJtPwUGNpTQ-KO3ZILoMFbZ_8JVMO0",

  authDomain: "chatappcelebrities.firebaseapp.com",

  projectId: "chatappcelebrities",

  storageBucket: "chatappcelebrities.firebasestorage.app",

  messagingSenderId: "94822416091",

  appId: "1:94822416091:web:e7f83790d80afe12f7d6fe"

};


const Firebaseapp = firebase.initializeApp(firebaseConfig);


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
Firebaseapp.messaging().getToken({ vapidKey: 'BIwitLvpJOxocFqZBvjf1dZ-QqwFubEHrO-VtpIV2XUSP3zLJleSivH5CEMXOG2n1HJil8XjWtJRskhaPeZq8fM' }).then((currentToken) => {
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

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
  }