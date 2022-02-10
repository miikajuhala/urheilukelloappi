import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import StravaLogin from './StravaLogin';
import Trainings from './Trainings';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Trainings" component={Trainings} />
      <Drawer.Screen name="StravaLogin" component={StravaLogin} />
    </Drawer.Navigator>
  );
}