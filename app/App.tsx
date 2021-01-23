import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainBottomNavigator from "./components/navigator/MainBottomNavigator";

function App() {
	return (
		<NavigationContainer>
			<MainBottomNavigator/>
		</NavigationContainer>
	);
}


export default App;
