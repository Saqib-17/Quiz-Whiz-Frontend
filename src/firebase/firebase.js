import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXOWYb3yxwRv7-g-f81b2W15zWSrPyFgY",
  authDomain: "quizwhiz-app.firebaseapp.com", // Example
  projectId: "quizwhiz-app",
  storageBucket: "quizwhiz-app.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
