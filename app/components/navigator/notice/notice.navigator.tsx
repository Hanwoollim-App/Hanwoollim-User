import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NoticeDetail } from '../../screens';

const NoticeStack = createStackNavigator();

export function NoticeNavigator() {
	return (
		<NoticeStack.Navigator>
			<NoticeStack.Screen
				name="NoticeDetail"
				component={NoticeDetail}
				options={{
					headerShown: false,
				}}
			/>
		</NoticeStack.Navigator>
	);
}
