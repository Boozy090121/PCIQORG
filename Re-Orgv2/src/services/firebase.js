import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

// Firebase configuration with your provided values
const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyB8v5Jwcc-73i3-CuZ70BH1EW_LsWuVs0Q",
  authDomain: "reorg-cfa43.firebaseapp.com",
  projectId: "reorg-cfa43",
  storageBucket: "reorg-cfa43.firebasestorage.app",
  messagingSenderId: "754287455974",
  appId: "1:754287455974:web:fd00416f1ede3044db5527",
  measurementId: "G-J9WN5L29Q7"
=======
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94
};

// Initialize Firebase immediately
let app;
let db;
let auth;

<<<<<<< HEAD
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  console.log('Firebase core services initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase core services:', error);
}
=======
export const initializeFirebase = () => {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

export const getFirebaseApp = () => app;
export const getFirebaseDb = () => db;
export const getFirebaseAuth = () => auth;
>>>>>>> ff2e79f1e6f7febe7a838a67b6ad7f42717fea94

// Firebase service class
class FirebaseService {
  constructor() {
    this.currentUser = null;
    this.isInitialized = !!app && !!db && !!auth;
    console.log('FirebaseService constructed, initialized status:', this.isInitialized);
  }

  // Helper function to check initialization
  checkInitialization = () => {
    if (!app || !db || !auth) {
      console.error('Firebase core services unavailable');
      throw new Error('Firebase services unavailable');
    }
  };

  // Authentication functions
  login = async (email, password) => {
    try {
      console.log('Attempting login...');
      this.checkInitialization();
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User successfully authenticated');
      
      this.currentUser = {
        id: user.uid,
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        username: user.email,
        role: 'user'
      };
      
      try {
        // Get user role from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          this.currentUser.name = userData.name || this.currentUser.name;
          this.currentUser.role = userData.role || this.currentUser.role;
        } else {
          // Create user document if it doesn't exist
          await setDoc(userDocRef, {
            name: this.currentUser.name,
            email: this.currentUser.email,
            role: this.currentUser.role,
            createdAt: serverTimestamp()
          });
        }
      } catch (error) {
        console.error('Error managing user document:', error);
      }
      
      return { success: true, user: this.currentUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };

  // For development/testing only
  createDemoUser = () => {
    this.currentUser = {
      id: 'demo-user-id',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'user'
    };
    return { success: true, user: this.currentUser };
  };
}

// Create and export a singleton instance
const firebaseService = new FirebaseService();
export default firebaseService; 