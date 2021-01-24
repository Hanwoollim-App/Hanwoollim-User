import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import FlashMob from "../screens/FlashMob";
import Board from "../screens/Board";
import bottomTabIconOption from "../../utils/NavigationUtil";
import ReservationNaviagator from "./ReservationNaviagator";

const bottomTab = createMaterialBottomTabNavigator();

function MainBottomNavigator() {
	return (
		<bottomTab.Navigator
			initialRouteName="Home"
			backBehavior="none"
			screenOptions={({route}) => ({
				tabBarIcon: () => bottomTabIconOption(route),
			})}
			tabBarOptions= {{
				showLabel: false,
			}}
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
				component={ReservationNaviagator}
			/>
			<bottomTab.Screen
				name="Board"
				component={Board}
			/>
		</bottomTab.Navigator>
	);
}

export default MainBottomNavigator;
