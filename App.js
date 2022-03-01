import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Trainings from './Components/Trainings';
import StravaLogin from './Components/StravaLogin';
import HomeScreen from './Components/HomeScreen';
import Login from './Components/Login';



export default function App() {
  

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Trainings" component={Trainings} />
      <Drawer.Screen name="Login" component={Login} />
      {/* <Drawer.Screen name="StravaLogin" component={StravaLogin} /> */}
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
