import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReservationTimeTable from '../screens/reservation/timeTable';
import ReservationProcess from '../screens/reservation/process';
import ReservationContext, {
	ReservationInfo,
} from '../../utils/context/ReservationContext';

const ReservationStack = createStackNavigator();

function ReservationNavigator() {
	return (
		<ReservationContext.Provider value={new ReservationInfo()}>
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
		</ReservationContext.Provider>
	);
}

export default ReservationNavigator;
