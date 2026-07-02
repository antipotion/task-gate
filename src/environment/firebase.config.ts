// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAVSeLGXp9c3d6EsbdgUX-YyVPlPpNh7oQ',
  authDomain: 'task-gate-c1a50.firebaseapp.com',
  projectId: 'task-gate-c1a50',
  storageBucket: 'task-gate-c1a50.firebasestorage.app',
  messagingSenderId: '279248801692',
  appId: '1:279248801692:web:858f3a0f68e1a3f1134259',
  measurementId: 'G-WQ09JXGNXR',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);