import * as React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { Storage, sessionStorage } from '../Classes/Storage'
import axios from 'axios';

export default function Trainings({navigation}) {

  const [trainings, setTrainings] = React.useState([])
  React.useEffect(() => getTrainings() ,[])
  React.useEffect(() => console.log(trainings),[trainings])
  
  const getTrainings = () => {
    console.log(sessionStorage.getItem('access_token'))
    axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers : {
        'Authorization':`Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
    .then(res => {
      setTrainings(res.data)
    })
    .catch(err => console.error(err))
  }

  const renderItem = ({item}) => {
    return <View styles={styles}><Text>{item.name}, {item.distance}</Text></View>
  }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Trainings</Text>
        <FlatList
          data={trainings}
          renderItem={renderItem}
          keyExtractor={training => training.id}
        >
        </FlatList>
        <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}/>
 





      </View>
    );
  }

  const styles = StyleSheet.create({
    item: {
      flex: 1,
      backgroundColor:'#A52A2A',
      alignItems: 'center',
      justifyContent: 'center',
    }})