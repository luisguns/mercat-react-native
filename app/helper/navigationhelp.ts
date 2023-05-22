import { NavigationState } from "@react-navigation/native";

export const getCurrentRoute = (
    state: NavigationState | Required<NavigationState['routes'][0]>['state'],
  ): String | undefined => {
    if (state.index === undefined || state.index < 0) {
      return undefined;
    }
    const nestedState = state.routes[state.index].state;
    if (nestedState !== undefined) {
      return getCurrentRoute(nestedState);
    }
    return state.routes[state.index].name;
  };