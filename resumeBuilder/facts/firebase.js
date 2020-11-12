var firebaseConfig = {
    apiKey: "AIzaSyB6dd1FXE7Y4aZ3w72UJtCFfTOnh4oCCHc",
    authDomain: "resumebuilder-3df6f.firebaseapp.com",
    databaseURL: "https://resumebuilder-3df6f.firebaseio.com",
    projectId: "resumebuilder-3df6f",
    storageBucket: "resumebuilder-3df6f.appspot.com",
    messagingSenderId: "948000495634",
    appId: "1:948000495634:web:94e8eba75bca769d9820cb"
  };
  firebase.initializeApp(firebaseConfig);
  let auth = firebase.auth();
  let db = firebase.firestore();