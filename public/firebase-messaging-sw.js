importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDT2JI1cL_r1UVvmp4OKSK4jvRHyRjWrtM",
    authDomain: "haniti-3aeed.firebaseapp.com",
    projectId: "haniti-3aeed",
    storageBucket: "haniti-3aeed.appspot.com",
    messagingSenderId: "283913550582",
    appId: "1:283913550582:web:b385fde13a5fe3e18c4ad7",
    measurementId: "G-MBK0LV4WQH",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});
