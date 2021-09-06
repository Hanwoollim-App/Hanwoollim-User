import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Home, FlashMob, Board } from '../../screens';
import { ReservationNavigator } from '..';
import { bottomTabIconOption } from '../../../utils';

const bottomTab = createMaterialBottomTabNavigator();

export function BottomTabNavigator() {
	return (
		<bottomTab.Navigator
			initialRouteName="Home"
			backBehavior="history"
			activeColor="#00203f"
			inactiveColor="#a9a9a9"
			barStyle={{ backgroundColor: '#ffffff' }}
			labeled={false}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => bottomTabIconOption(route, color),
			})}>
			<bottomTab.Screen name="Home" component={Home} />
			<bottomTab.Screen name="FlashMob" component={FlashMob} />
			<bottomTab.Screen
				name="ReservingTimeTable"
				component={ReservationNavigator}
			/>
			<bottomTab.Screen name="Board" component={Board} />
		</bottomTab.Navigator>
	);
}
