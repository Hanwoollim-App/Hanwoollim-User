import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ReservationTimeTable from "../screens/Reservation/ReservationTimeTable";
import ReservingProcess from "../screens/Reservation/ReservingProcess";

const ReservationStack = createStackNavigator();

function ReservationNaviagator() {
	return (
		<ReservationStack.Navigator
			initialRouteName="ReservingTimeTable"
		>
			<ReservationStack.Screen
				name="ReservingTimeTable"
				component={ReservationTimeTable}
				options={{
					headerShown: false,
				}}
			/>
			<ReservationStack.Screen
				name="ReservingProcess"
				component={ReservingProcess}
				options={{
					headerShown: false,
				}}
			/>
		</ReservationStack.Navigator>
	);
}

export default ReservationNaviagator;
