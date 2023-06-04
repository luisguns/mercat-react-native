import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackComponent from "./app/presentation/pages/pageconfig/screenconfig";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StackComponent />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
