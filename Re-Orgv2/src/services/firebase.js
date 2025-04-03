import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let app;
let db;
let auth;

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

// Firebase service class
class FirebaseService {
  constructor() {
    this.currentUser = null;
    this.isInitialized = false;
  }

  // Initialize the Firebase service
  init = () => {
    try {
      console.log('Initializing Firebase service...');
      this.isInitialized = true;
      console.log('Firebase service initialized successfully');
      return true;
    } catch (error) {
      console.error("Error initializing Firebase service:", error);
      console.error("Stack trace:", error.stack);
      this.isInitialized = false;
      return false;
    }
  };

  // Helper function to check initialization
  checkInitialization = () => {
    if (!this.isInitialized) {
      throw new Error('Firebase service not properly initialized');
    }
  };

  // Authentication functions
  login = async (email, password) => {
    try {
      console.log('Attempting login...');
      this.checkInitialization();
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
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
        console.log('Fetching user data from Firestore...');
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          this.currentUser.name = userData.name || this.currentUser.name;
          this.currentUser.role = userData.role || this.currentUser.role;
          console.log('User data retrieved from Firestore');
        } else {
          console.log('Creating new user document in Firestore...');
          // Create user document if it doesn't exist
          await db.collection('users').doc(user.uid).set({
            name: this.currentUser.name,
            email: this.currentUser.email,
            role: this.currentUser.role,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          console.log('New user document created in Firestore');
        }
      } catch (error) {
        // Handle Firestore errors gracefully
        if (error.code === 'permission-denied') {
          console.warn('Permission denied accessing user document. Using default user data.');
        } else {
          console.error('Error managing user document:', error);
        }
      }
      
      return { success: true, user: this.currentUser };
    } catch (error) {
      console.error('Login error:', error);
      console.error('Stack trace:', error.stack);
      return { success: false, message: error.message };
    }
  };

  register = async (userData) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
      const user = userCredential.user;
      
      // Update user profile
      await user.updateProfile({
        displayName: userData.name
      });
      
      // Create user document in Firestore
      await db.collection('users').doc(user.uid).set({
        name: userData.name,
        email: userData.email,
        role: 'user',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      this.currentUser = {
        id: user.uid,
        name: userData.name,
        email: userData.email,
        username: userData.email,
        role: 'user'
      };
      
      return { success: true, user: this.currentUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  logout = async () => {
    try {
      await auth.signOut();
      this.currentUser = null;
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  getCurrentUser = () => {
    return this.currentUser;
  };

  isLoggedIn = () => {
    return !!this.currentUser;
  };

  saveAppState = async (state) => {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }
      
      await db.collection('appStates').doc(this.currentUser.id).set({
        state,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  loadAppState = async () => {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }
      
      const doc = await db.collection('appStates').doc(this.currentUser.id).get();
      if (doc.exists) {
        return { success: true, state: doc.data().state };
      }
      return { success: false, message: 'No saved state found' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  exportUserData = async () => {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }
      
      const userData = await db.collection('users').doc(this.currentUser.id).get();
      const appState = await db.collection('appStates').doc(this.currentUser.id).get();
      
      const exportData = {
        user: userData.exists ? userData.data() : null,
        appState: appState.exists ? appState.data() : null,
        exportedAt: new Date().toISOString()
      };
      
      return { success: true, data: exportData };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  importUserData = async (jsonData) => {
    try {
      if (!this.currentUser) {
        throw new Error('User not authenticated');
      }
      
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      
      if (data.user) {
        await db.collection('users').doc(this.currentUser.id).set(data.user, { merge: true });
      }
      
      if (data.appState) {
        await db.collection('appStates').doc(this.currentUser.id).set(data.appState);
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}

// Create and export a singleton instance
const firebaseService = new FirebaseService();
export default firebaseService; 