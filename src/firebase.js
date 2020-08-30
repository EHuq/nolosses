import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA7M6ASY7z6caW11-guXYl5xbc_drikNL0',
  authDomain: 'nolosses-c2357.firebaseapp.com',
  databaseURL: 'https://nolosses-c2357.firebaseio.com',
  projectId: 'nolosses-c2357',
  storageBucket: 'nolosses-c2357.appspot.com',
  messagingSenderId: '1058833091832',
  appId: '1:1058833091832:web:16b6e9de26a8612178bf0d',
  measurementId: 'G-MYGDZVFZMN',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
