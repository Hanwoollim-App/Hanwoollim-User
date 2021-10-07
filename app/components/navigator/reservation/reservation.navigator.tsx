import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ItemType } from 'react-native-dropdown-picker';
import { NavigatorScreenParams } from '@react-navigation/native';
import { ReservationTimeTable, ReservationProcess } from '../../screens';

export type IReservationNavigatorParamList = {
	ReservationTimeTable: {};
	ReservationProcess: {
		weekName: ItemType;
		startDate: string;
	};
};

export type IReservationNavigatorNavigationProp =
	NavigatorScreenParams<IReservationNavigatorParamList>;

const ReservationStack = createStackNavigator<IReservationNavigatorParamList>();

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
