import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceNamePage from "../place/placenamepage";
import Colors from "../../values/colors";
import { screenLightWithoutHeader } from "../../values/themes";
import PlaceAddressPage from "../place/placeaddresspage";
import ModalScreen from "../place/placeaddresspage/modal";
import ProgressModal from "../../components/ModalComponent/ProgressModal";
import LoginPage from "../autheintication/LoginPage/LoginPage";
import RegisterPage from "../autheintication/RegisterPage/RegisterPage";
import SplashScreen from "../splash/SplashScreen";
import FavoritePlacePage from "../place/favoriteplace/FavoritePlacePage";
import BottomNavigationStack from "./BottomNavigationConfig/bottomconfig";

export default function StackComponent() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Group>
        <Stack.Screen 
          name="SplashScreen"
          component={SplashScreen}
          options={screenLightWithoutHeader()}
        />
        <Stack.Screen 
          name="LoginScreen"
          component={LoginPage}
          options={screenLightWithoutHeader()}
        />
        <Stack.Screen 
          name="RegisterScreen"
          component={RegisterPage}
          options={screenLightWithoutHeader()}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name="PlaceHome"
          component={FavoritePlacePage}
          options={screenLightWithoutHeader()}
        />

        <Stack.Screen
          name="PlaceName"
          component={PlaceNamePage}
          options={screenLightWithoutHeader()}
        />

        <Stack.Screen
          name="PlaceAddress"
          component={PlaceAddressPage}
          options={screenLightWithoutHeader()}
        />

        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigationStack}
          options={screenLightWithoutHeader()}
        />
      </Stack.Group>
    
      <Stack.Group
        screenOptions={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      >
        <Stack.Screen name="PlaceAddresModal" component={ModalScreen} />

        <Stack.Screen name="ProgressModal" component={ProgressModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
