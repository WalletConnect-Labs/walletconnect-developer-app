import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams
} from "react-navigation";

let _navigator: NavigationContainerComponent | null;

export function setTopLevelNavigator(
  navigatorRef: NavigationContainerComponent | null
) {
  _navigator = navigatorRef;
}

export function navigate(routeName: string, params: NavigationParams) {
  if (_navigator) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }
}
