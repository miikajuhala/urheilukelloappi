import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';

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

WebBrowser.maybeCompleteAuthSession();

export default function Login({navigation}) {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '435632025856-ftfjds9o4t8rvi1pej4piphhmlpu1rs7.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
      console.log(response)
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}