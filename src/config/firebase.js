const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
require('dotenv').config();

//Initialize Firebase admin
const serviceAccount = {
  type: "service_account",
  project_id: "bilgesucakir-codeway-case",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
};

//Initialize Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

//Initialize Firebase client SDK
const firebaseConfig = {
  apiKey: "AIzaSyBwBgXLyyuUcVXzPyR5M56uoXNLqPZ1JSU",
  authDomain: "bilgesucakir-codeway-case.firebaseapp.com",
  projectId: "bilgesucakir-codeway-case",
  storageBucket: "bilgesucakir-codeway-case.firebasestorage.app",
  messagingSenderId: "784847467530",
  appId: "1:784847467530:web:87f0a6ae9b981339e69bf3"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth, firebaseApp }; 