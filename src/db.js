import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAqc7_6P7HYPazIco4lN1FIozb9HqhsO4I',
  authDomain: 'firechat-315803.firebaseapp.com',
  databaseURL: 'https://firechat-315803-default-rtdb.firebaseio.com',
  projectId: 'firechat-315803',
  storageBucket: 'firechat-315803.appspot.com',
  messagingSenderId: '527282405516',
  appId: '1:527282405516:web:900f738e8693037b47bba9',
  measurementId: 'G-1NYNHVQ1VV',
}

export const db = firebase.initializeApp(firebaseConfig).firestore()
