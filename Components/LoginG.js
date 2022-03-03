import * as React from 'react';
import { initializeApp } from 'firebase/app';
import * as Google from 'expo-google-app-auth';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { FontAwesome5 } from '@expo/vector-icons';

import { getAuth, onAuthStateChanged, signInWithCredential, GoogleAuthProvider} from "firebase/auth";


import { Text } from 'react-native-elements';
// // import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBlrFBpsR6x2KpmXBHkuMBw_Pr7qzSiiyQ",
  authDomain: "urheilukelloappi.firebaseapp.com",
  databaseURL: "https://urheilukelloappi-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "urheilukelloappi",
  storageBucket: "urheilukelloappi.appspot.com",
  messagingSenderId: "435632025856",
  appId: "1:435632025856:web:78c23422eea4256eca83e5",
  measurementId: "G-MDF1RC8EE5"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// WebBrowser.maybeCompleteAuthSession();




export default function LoginG({navigation}) {
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
        .then(
          //save tokens
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