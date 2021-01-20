import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import React from "react";
import Home from "./components/screens/Home";
import FlashMob from "./components/screens/FlashMob";
import Reservation from "./components/screens/Reservation";
import Board from "./components/screens/Board";

function App() {
	const bottomTab = createMaterialBottomTabNavigator();

	return (
		<NavigationContainer>
			<bottomTab.Navigator>
				<bottomTab.Screen
					name="Home"
					component={Home}
				/>
				<bottomTab.Screen
					name="FlashMob"
					component={FlashMob}
				/>
				<bottomTab.Screen
					name="Reservation"
					component={Reservation}
				/>
				<bottomTab.Screen
					name="Board"
					component={Board}
				/>
			</bottomTab.Navigator>
		</NavigationContainer>
	);
}


export default App;
