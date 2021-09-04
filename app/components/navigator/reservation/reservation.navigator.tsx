import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ReservationTimeTable, ReservartionProcess } from '../../screens';

const ReservationStack = createStackNavigator();

export function ReservationNavigator() {
	return (
		<ReservationStack.Navigator initialRouteName="ReservationTimeTable">
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
