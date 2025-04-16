importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyDqNGkEsamxKu33QRI-blAn-1S5RzvOO7w",
    authDomain: "messenger-app-51e84.firebaseapp.com",
    projectId: "messenger-app-51e84",
    storageBucket: "messenger-app-51e84.firebasestorage.app",
    messagingSenderId: "903432187934",
    appId: "1:903432187934:web:5809a7039637d01aaefe0f",
    measurementId: "G-YPKJFL0CBS"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png',
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});