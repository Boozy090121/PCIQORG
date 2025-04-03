import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class FirebaseService {
  // Authentication methods
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  onAuthStateChange(callback) {
    return onAuthStateChanged(auth, callback);
  }

  // Data management methods
  async saveAppState() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      const state = {
        orgChart: window.store.getState().orgChart,
        focusFactory: window.store.getState().focusFactory,
        personnel: window.store.getState().personnel,
        implementationTracking: window.store.getState().implementationTracking,
        transitionPlan: window.store.getState().transitionPlan,
        phase: window.store.getState().phase,
        timestamp: new Date().toISOString()
      };

      await setDoc(doc(db, 'appStates', user.uid), state);
      return state;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async loadAppState() {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      const docRef = doc(db, 'appStates', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async exportAppState() {
    try {
      const state = await this.loadAppState();
      if (!state) throw new Error('No state to export');
      return state;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async importAppState(state) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('No authenticated user');

      await setDoc(doc(db, 'appStates', user.uid), {
        ...state,
        timestamp: new Date().toISOString()
      });
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Error handling
  handleError(error) {
    console.error('Firebase Error:', error);
    return {
      code: error.code || 'unknown',
      message: error.message || 'An unknown error occurred'
    };
  }
}

const firebaseService = new FirebaseService();
export default firebaseService; 