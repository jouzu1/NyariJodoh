import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import MainMenu from './MainMenu';
import DataCalon from './DataCalon';
import DetailCalon from './DetailCalon';
import PilihCalon from './PilihCalon';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={{ headerShown:false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown:false }}/>
      <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
      <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown:false }}/>
      <Stack.Screen name="DataCalon" component={DataCalon}/>
      <Stack.Screen name="DetailCalon" component={DetailCalon} />
      <Stack.Screen name="PilihCalon" component={PilihCalon} />
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
