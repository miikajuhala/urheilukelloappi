import * as React from 'react';
import { initializeApp } from 'firebase/app';
import * as Google from 'expo-google-app-auth';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { FontAwesome5 } from '@expo/vector-icons';
import { getDatabase, push, ref} from "firebase/database";
import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider,  } from "firebase/auth";


import { Text } from 'react-native-elements';
// // import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


//MIIKAN FIREBASE OSOTE VAIHDA OMAAN/YHTEISEEN
const firebaseConfig = {
  apiKey: "AIzaSyBdIqSjOclL_tGXucPgmiB0TD-KEahtdrg",
  authDomain: "jaakot-a6194.firebaseapp.com",
  databaseURL: "https://jaakot-a6194-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "jaakot-a6194",
  storageBucket: "jaakot-a6194.appspot.com",
  messagingSenderId: "368888096026",
  appId: "1:368888096026:web:531c1523e793e538abb8a3",
  measurementId: "G-CJWZQWS4CE"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);

// WebBrowser.maybeCompleteAuthSession();




export default function GoogleLogin({navigation}) {
  const database = getDatabase(app);
  const auth = getAuth();


  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
    return false;
  }}
  
  function onSignIn(googleUser) {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        const credential = GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );
   
        // Sign in with credential from the Google user.
        signInWithCredential(auth, credential)
        .then(result=>{
          console.log("------------------------------------------------")
          console.log(result) 
          push(
            ref(database, 'users1'),{
              'displayName': result._tokenResponse.displayName,
              'email': result._tokenResponse.email,
              'oauthIdToken': result._tokenResponse.oauthIdToken,
              'oauthAccessToken': result._tokenResponse.oauthAccessToken,
              'photoUrl': result._tokenResponse.photoUrl
            }
          )
        }
          //Create user and save tokens to user
          //learn to use tokens to authenticate in future

        ).catch((error) => {
          // Handle Errors here.
          console.log(error.message);
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }


async function signInWithGoogleAsync() {
  try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId: '705784980272-a04vd6g1igijbnoh6h6bvvsu3mknr9oh.apps.googleusercontent.com',
        iosClientId: '435632025856-hoe4vok2rmfigeguodt34tnnmkj4ll5d.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result)
        return result.accessToken
        
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
}

    return (
    <>
    <FontAwesome5.Button name="google" onPress={()=>{signInWithGoogleAsync()}}>
       <Text >Log In With Google</Text>
    </FontAwesome5.Button>
   
    </>
    );
  }