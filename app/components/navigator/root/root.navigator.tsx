import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginNavigator, BottomTabNavigator, NoticeNavigator } from '..';
import { NoticeScreen, MyPage, InfoEdit } from '../../screens';

const RootStackNavigator = createStackNavigator();

export function RootNavigator() {
	return (
		<NavigationContainer>
			<RootStackNavigator.Navigator>
				<RootStackNavigator.Screen
					name="LoginNavigator"
					component={LoginNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<RootStackNavigator.Screen
					name="BottomTabNavigator"
					component={BottomTabNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<RootStackNavigator.Screen
					name="NoticeNavigator"
					component={NoticeNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<RootStackNavigator.Screen
					name="NoticeScreen"
					component={NoticeScreen}
					options={{
						headerShown: false,
					}}
				/>
				<RootStackNavigator.Screen
					name="MyPage"
					component={MyPage}
					options={{
						headerShown: false,
					}}
				/>
				<RootStackNavigator.Screen
					name="infoEdit"
					component={InfoEdit}
					options={{
						headerShown: false,
					}}
				/>
			</RootStackNavigator.Navigator>
		</NavigationContainer>
	);
}
