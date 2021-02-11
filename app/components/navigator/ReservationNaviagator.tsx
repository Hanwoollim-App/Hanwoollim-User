import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ReservingProcess from "../screens/reservation/ReservingProcess";
import ReservationTimeTable from "../screens/reservation/ReservationTimeTable";

const ReservationStack = createStackNavigator();

function ReservationNaviagator() {
	return (
		<ReservationStack.Navigator
			initialRouteName="ReservationTimeTable"
		>
			<ReservationStack.Screen
				name="ReservationTimeTable"
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
