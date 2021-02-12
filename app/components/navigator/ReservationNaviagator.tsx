import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ReservationTimeTable from "../screens/reservation/timeTable/ReservationTimeTable";
import ReservationProcess from "../screens/reservation/process/ReservationProcess";

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
				name="ReservationProcess"
				component={ReservationProcess}
				options={{
					headerShown: false,
				}}
			/>
		</ReservationStack.Navigator>
	);
}

export default ReservationNaviagator;
