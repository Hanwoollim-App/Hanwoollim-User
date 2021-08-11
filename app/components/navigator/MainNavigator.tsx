import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginNavigator from './LoginNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import NoticeNavigator from './NoticeNavigator';
import NoticeScreen from '../screens/notice';
import MyPage from '../screens/myPage';

const MainStackNavigator = createStackNavigator();

function MainNavigator() {
	return (
		<NavigationContainer>
			<MainStackNavigator.Navigator>
				<MainStackNavigator.Screen
					name="LoginNavigator"
					component={LoginNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<MainStackNavigator.Screen
					name="BottomTabNavigator"
					component={BottomTabNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<MainStackNavigator.Screen
					name="NoticeNavigator"
					component={NoticeNavigator}
					options={{
						headerShown: false,
					}}
				/>
				<MainStackNavigator.Screen
					name="NoticeScreen"
					component={NoticeScreen}
					options={{
						headerShown: false,
					}}
				/>
				<MainStackNavigator.Screen
					name="MyPage"
					component={MyPage}
					options={{
						headerShown: false,
					}}
				/>
			</MainStackNavigator.Navigator>
		</NavigationContainer>
	);
}

export default MainNavigator;
