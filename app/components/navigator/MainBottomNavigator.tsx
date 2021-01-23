import React from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import FlashMob from "../screens/FlashMob";
import Reservation from "../navigator/ReservationNaviagator";
import Board from "../screens/Board";
import bottomTabIconOption from "../../utils/NavigationUtil";

const bottomTab = createMaterialBottomTabNavigator();

function MainBottomNavigator() {
	return (
		<bottomTab.Navigator
			initialRouteName="Home"
			backBehavior="none"
			screenOptions={({route}) => ({
				tabBarIcon: bottomTabIconOption(route),
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
	);
}

export default MainBottomNavigator;
