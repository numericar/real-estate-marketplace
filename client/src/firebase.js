// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*
    เมื่อใช้ vite เราสามารถสร้าง dotenv ขึ้นมา และตัวแปรที่ขึ้นต้นด้วย VITE_ จะถูกอ่านและนำมาเก็บไว้ใน
    import.meta.env ให้อัตโนมัติ
*/

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-marketplace-e7058.firebaseapp.com",
  projectId: "real-estate-marketplace-e7058",
  storageBucket: "real-estate-marketplace-e7058.firebasestorage.app",
  messagingSenderId: "288084249371",
  appId: "1:288084249371:web:fd29d345d8b2d6852361be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);