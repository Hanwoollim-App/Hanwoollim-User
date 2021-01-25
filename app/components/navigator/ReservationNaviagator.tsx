import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ReservingProcess from "../screens/Reservation/ReservingProcess";
import MainBottomNavigator from "./MainBottomNavigator";

const ReservationStack = createStackNavigator();

function ReservationNaviagator() {
	return (
		<ReservationStack.Navigator
			initialRouteName="MainBottomNavigator"
		>	
			<ReservationStack.Screen
				name="MainBottomNavigator"
				component={MainBottomNavigator}
				options={{
					headerShown: false,
				}}
			/>
			<ReservationStack.Screen
				name="ReservingProcess"
				component={ReservingProcess}
			/>
		</ReservationStack.Navigator>
	);
}

export default ReservationNaviagator;
