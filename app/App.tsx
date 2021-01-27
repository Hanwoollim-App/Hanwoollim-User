import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import LoginNavigator from "./components/navigator/LoginNavigator";

function App() {
	return (
		<NavigationContainer>
			<LoginNavigator/>
		</NavigationContainer>
	);
}


export default App;
