import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { screenLightWithoutHeader } from "../../../values/themes";
import Colors from "../../../values/colors";
import { StyleSheet, Image, Text } from "react-native";
import { ParamListBase, RouteProp, useRoute } from "@react-navigation/native";
import MainHomePage from "../../BottomNavigationPages/home/MainHomePage";
import SectionModel from "../../../../domain/models/SectionModel";
import { useEffect, useState } from "react";
import { BottomTabScreenProps } from "./bottomscreenprops";
import MainPurchasePage from "../../BottomNavigationPages/purchase/MainPurchasePage";
import MainDashboardPage from "../../BottomNavigationPages/dashboard/MainDashboardPage";
import MainProfilePage from "../../BottomNavigationPages/profile/MainProfilePage";



let section: SectionModel
export default function BottomNavigationStack() {
    const Tab = createBottomTabNavigator<BottomTabScreenProps>();
    const routes = useRoute()
    section = routes.params as SectionModel
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: configureBottomIcons(route),
                tabBarLabel: ({ focused, color }) => (
                    <Text
                        style={{
                            color: focused ? Colors.primary : Colors.grayScale900,
                            fontSize: 12,
                            fontWeight: focused ? "bold" : "normal",
                        }}> {route.name} </Text>
                ),
            })}
            >
            <Tab.Screen
                name="Home"
                component={MainHomePage}
                initialParams={section}
            ></Tab.Screen>
            <Tab.Screen
                name="Compras"
                component={MainPurchasePage}
            ></Tab.Screen>
            <Tab.Screen
                name="Historico"
                component={MainDashboardPage}
            ></Tab.Screen>
            <Tab.Screen
                name="Perfil"
                options={{ tabBarBadge: 3 }}
                component={MainProfilePage}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}

const style = StyleSheet.create({
    iconTab: {
        width: 24,
        height: 24,
    },
});
function configureBottomIcons(route: RouteProp<ParamListBase, string>) {
    return ({
        focused,
        color,
        size,
    }: {
        focused: boolean;
        color: string;
        size: Number;
    }) => {
        if (route.name === "Home") {
            return (
                <Image
                    style={[style.iconTab, hasFocused(focused)]}
                    source={require("../../../../assets/home_ic.png")}
                />
            );
        }

        if (route.name === "Compras") {
            return (
                <Image
                    style={[style.iconTab, hasFocused(focused)]}
                    source={require("../../../../assets/cart_ic.png")}
                />
            );
        }

        if (route.name === "Historico") {
            return (
                <Image
                    style={[style.iconTab, hasFocused(focused)]}
                    source={require("../../../../assets/dashboard_ic.png")}
                />
            );
        }

        if (route.name === "Perfil") {
            return (
                <Image
                    style={[style.iconTab, hasFocused(focused)]}
                    source={require("../../../../assets/account_circle_ic.png")}
                />
            );
        }
    };
}

function hasFocused(focused: boolean) {
    return {
        tintColor: focused ? Colors.primary : Colors.secondary,
    };
}
