import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { color } from '../../../utils';

type LoadingPageProps = {};

export const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<ActivityIndicator
				animating={true}
				color={color.mainColor}
				size="large"
			/>
		</View>
	);
};
