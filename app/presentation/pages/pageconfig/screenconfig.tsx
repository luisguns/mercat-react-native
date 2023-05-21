import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlaceNamePage from "../place/placenamepage";
import Colors from "../../values/colors";
import { screenLightWithoutHeader } from "../../values/themes";
import PlaceAddressPage from "../place/placeaddresspage";
import ModalScreen from "../place/placeaddresspage/modal";
import ProgressModal from "../../components/ModalComponent/ProgressModal";
import BottomNavigationPage from "../bottom_navigation/bottom_navigation_page";

export default function StackComponent() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="PlaceHome"
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
          component={BottomNavigationPage}
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
