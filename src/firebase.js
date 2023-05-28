import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC86v3H7nqqBep58Eq1kY5oW3IFn03cajk",
  authDomain: "pnltracker-e0dac.firebaseapp.com",
  projectId: "pnltracker-e0dac",
  storageBucket: "pnltracker-e0dac.appspot.com",
  messagingSenderId: "55144803279",
  appId: "1:55144803279:web:0e079c77620a3d504a40ba",
  measurementId: "G-N78DCKPW29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
