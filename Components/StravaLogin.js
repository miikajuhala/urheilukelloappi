import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button } from 'react-native';
import axios from 'axios';
import { Storage, sessionStorage } from '../Classes/Storage'

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
}; 


export default function StravaLogin({navigation}) {
 
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '76862',
      scopes: ['activity:read_all'],
      redirectUri: "exp://127.0.0.1:19000/redirect", //productissa expon oma redirect osote
    
    },
    discovery
  );
  //You are not currently signed in to Expo on your development machine. As a result, the redirect URL for AuthSession will be "https://auth.expo.io/@anonymous/urheilukelloappi-da7944ca-3e21-4830-9938-442ff046f0fc". If you are using an OAuth provider that requires adding redirect URLs to an allow list, we recommend that you do not add this URL -- instead, you should sign in to Expo to acquire a unique redirect URL. Additionally, if you do decide to publish this app using Expo, you will need to register an account to do it.
    if (response?.type === 'success') {

      const { code } = response.params;
      axios.get("https://jakko.herokuapp.com/exchange_token",{
        params:{ code: code},
      })
      .then(res =>{
        console.log("user created: " + res.data.athlete.id)
        sessionStorage.setItem("access_token", res.data.access_token)
        navigation.navigate('Trainings')
      })
      .catch(err => console.error(err))
    }
  
  return (
     
    <Button
      disabled={!request}
      title="Login"
      onPress={promptAsync}
    />
  );
}

