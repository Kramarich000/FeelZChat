import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDqNGkEsamxKu33QRI-blAn-1S5RzvOO7w",
  authDomain: "messenger-app-51e84.firebaseapp.com",
  projectId: "messenger-app-51e84",
  storageBucket: "messenger-app-51e84.firebasestorage.app",
  messagingSenderId: "903432187934",
  appId: "1:903432187934:web:5809a7039637d01aaefe0f",
  measurementId: "G-YPKJFL0CBS"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging };