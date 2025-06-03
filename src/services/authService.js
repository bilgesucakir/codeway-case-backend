const { auth, db, firebaseApp } = require('../config/firebase');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require('firebase/auth');
const User = require('../models/User');

class AuthService {
  constructor() {
    this.usersCollection = db.collection('users');
    this.auth = getAuth(firebaseApp);
  }

  //Sign in
  async signIn(email, password) {
    try {

      // Sign in with Firebase SDK
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // Update last login
      await this.usersCollection.doc(userCredential.user.uid).update({
        lastLoginAt: new Date()
      });

      //Get user data
      const userDoc = await this.usersCollection.doc(userCredential.user.uid).get();
      const user = User.fromFirestore(userDoc);

      return {
        user,
        token: idToken
      };
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Authentication failed');
    }
  }

  //Sign up
  async signUp(email, password, displayName) {
    try {

      //Create user with Firebase SDK
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      //Create user document in Firestore
      const user = new User({
        uid: userCredential.user.uid,
        email,
        displayName,
        role: 'user'
      });

      await this.usersCollection.doc(userCredential.user.uid).set(user.toFirestore());

      return {
        user,
        token: idToken
      };
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('User creation failed');
    }
  }

  async verifyToken(token) {
    try {
      const decodedToken = await auth.verifyIdToken(token);
      const userDoc = await this.usersCollection.doc(decodedToken.uid).get();
      return User.fromFirestore(userDoc);
    } catch (error) {
      console.error('Token verification error:', error);
      throw new Error('Invalid token');
    }
  }

  //Reset password
  async resetPassword(email) {
    try {
      const userRecord = await auth.getUserByEmail(email);
      await auth.generatePasswordResetLink(email);
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Password reset failed');
    }
  }

  //Update password
  async updatePassword(uid, newPassword) {
    try {
      await auth.updateUser(uid, {
        password: newPassword
      });
      return true;
    } catch (error) {
      console.error('Password update error:', error);
      throw new Error('Password update failed');
    }
  }

  //Sign out
  async signOut(uid) {
    try {

      //Sign out from Firebase SDK
      await signOut(this.auth);
      
      //Update last logout timestamp
      await this.usersCollection.doc(uid).update({
        lastLogoutAt: new Date()
      });
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      throw new Error('Sign out failed');
    }
  }
}

module.exports = new AuthService(); 