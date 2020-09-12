import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signin from './src/components/Signin.js'
import Signup from './src/components/Signup.js'
import Home from './src/components/Home.js'
import Create from './src/components/Create.js'
import Edit from './src/components/Edit.js'

import {firebase} from './src/firebase/config'

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);


  useEffect(() => {
    const userRef=firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        userRef.doc(user.uid).get().then((document)=>{
          const userData=document.data();
          setLoading(false);
          setUser(userData)

        }).catch((error)=>{
          setLoading(false)
        })
        
      }
      else{
        setLoading(false);
      }
    })


  }, [])

  if (loading) {	
    return (	
      <></>	
    )	
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      { user ? (
        <>
          <Stack.Screen name="Home">
            {props => <Home {...props} extraData={user} />
            }
          </Stack.Screen>
          <Stack.Screen name="Create" component={Create} />
          <Stack.Screen name="Edit" component={Edit} />



        </>
          
        ):(<>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />


        </>)}
      </Stack.Navigator>
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
