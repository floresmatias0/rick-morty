import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  let firebaseConfig = {
    apiKey: "AIzaSyDw23eEK3GczAH2X71b77eVwGdViVdB-qI",
    authDomain: "rickandmorty-c69c5.firebaseapp.com",
    projectId: "rickandmorty-c69c5",
    storageBucket: "rickandmorty-c69c5.appspot.com",
    messagingSenderId: "184118299134",
    appId: "1:184118299134:web:0611fa08e0c09d7671d8af",
    measurementId: "G-J1NTMCYDCZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  //llamamos a la base de datos firestore
  export const db = firebase.firestore().collection('favs')

  export const getFavs = (id) => {
    return db.doc(id).get()
        .then(snap => {
          return snap.data().array
        })
  }

  export const updateDB = (array,id) => {
    //en el documento del USUARIO
    //firebase en el set soporta un objeto NO un array
    return db.doc(id).set({array})
    //db.doc(id).set({favoritos:[...array]}) tambien es valido
  }

  export const signOutGoogle = () => {
    firebase.auth().signOut()
  }

  export const loginWithGoogle = () => {
    //firebase siempre devuelve una promesa
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      //var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = credential.accessToken;
      // The signed-in user info.
      let user = {
        id: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
        }

      console.log("USUARIO:",user)
      return user
    }).catch((error) => {
      // Handle Errors here.
      //var errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      //var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      //var credential = error.credential;
      // ...
      console.log("ERROR:",errorMessage)
      return errorMessage
    });
  }
