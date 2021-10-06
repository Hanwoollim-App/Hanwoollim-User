import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { color } from '../../../utils';

type ILoadingPageProps = {};

export const LoadingPage: React.FC<ILoadingPageProps> = () => {
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
