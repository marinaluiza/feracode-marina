import firebase from 'firebase'

var config = {
    apiKey: 'AIzaSyDZx9b1iIJFC0gWzzzk-Hb_6qScIYYJS-0',
    authDomain: 'feracode-2fbbd.firebaseapp.com',
    databaseURL: 'https://feracode-2fbbd.firebaseio.com',
    projectId: 'feracode-2fbbd',
    storageBucket: 'feracode-2fbbd.appspot.com',
    messagingSenderId: '507469042071'
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
