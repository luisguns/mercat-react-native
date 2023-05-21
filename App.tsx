import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackComponent from './app/presentation/pages/pageconfig/screenconfig';

export default function App() {
  return (
    <NavigationContainer>
      <StackComponent/>
    </NavigationContainer>
  );
}