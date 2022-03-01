import * as React from 'react';
import { View, Text, Button, Image, Linking } from 'react-native';
import StravaLogin from './StravaLogin';


export default function HomeScreen({navigation}) {



    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={{uri: 'https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/d7/21/45/d72145f3-aedd-5497-cd7b-801720f5050f/AppIcon-1x_U007emarketing-0-7-0-85-220.png/1200x630wa.png'}}  style={{width: 49, height: 49}} ></Image>
       <StravaLogin></StravaLogin>
      </View> 
    );
  }