import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faBolt, faPlusCircle,faClipboardList,IconDefinition} from "@fortawesome/free-solid-svg-icons";
import Home from "./components/screens/Home";
import FlashMob from "./components/screens/FlashMob";
import Reservation from "./components/screens/Reservation";
import Board from "./components/screens/Board";

function App() {
	const bottomTab = createMaterialBottomTabNavigator();

	return (
		<NavigationContainer>
			<bottomTab.Navigator
				initialRouteName="Home"
				backBehavior="none"
				screenOptions={({route}) => ({
					tabBarIcon: () => {
						let iconName: IconDefinition;

						switch (route.name) {
							case "Home":
								iconName = faHome;
								break;
							case "FlashMob":
								iconName = faBolt;
								break;
							case "Reservation":
								iconName = faPlusCircle;
								break;
							case "Board":
								iconName = faClipboardList;
								break;
							default:
								iconName = faHome;
								break;
						}
						return <FontAwesomeIcon icon={iconName} size={20} color='#000000'/>;
					},
				})}
			>
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
