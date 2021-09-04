import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from '../login/login.navigator';
import BottomTabNavigator from '../bottom-tab/bottom-tab.navigator';
import NoticeNavigator from '../notice/notice.navigator';
import NoticeScreen from '../../screens/notice';
import MyPage from '../../screens/my-page';
import infoEdit from '../../screens/my-page/my-page-info-edit/my-page-info-edit.screen.tsx';

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
					component={infoEdit}
					options={{
						headerShown: false,
					}}
				/>
			</RootStackNavigator.Navigator>
		</NavigationContainer>
	);
}
