import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAxjtNJIUWGoSdHgleRYqCcrZWLq1-lftI',
  authDomain: 'e-penilaian-jais.firebaseapp.com',
  projectId: 'e-penilaian-jais',
  storageBucket: 'e-penilaian-jais.firebasestorage.app',
  messagingSenderId: '120779932903',
  appId: '1:120779932903:web:96cc10dea51a91bc910e42',
  measurementId: 'G-2SWF2X9T9E',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

if (typeof window !== 'undefined') {
  void isSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(firebaseApp);
      }
    })
    .catch((error) => {
      console.error('Analytics initialization failed', error);
    });
}
