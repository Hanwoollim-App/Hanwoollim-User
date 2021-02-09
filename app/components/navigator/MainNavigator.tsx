import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginNavigator from "./LoginNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const MainStackNavigator = createStackNavigator();

function MainNavigator() {
	return (
		<NavigationContainer>
			<MainStackNavigator.Navigator>
				<MainStackNavigator.Screen
					name="LoginNavigator"
					component={LoginNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<MainStackNavigator.Screen
					name="BottomTabNavigator"
					component={BottomTabNavigator}
					options={{
						headerShown: false,
					}}
				/>
				{/* <UserInfoStackNavigator/>  추후에 추가 예정*/}
			</MainStackNavigator.Navigator>
		</NavigationContainer>
	);
}

export default MainNavigator;
