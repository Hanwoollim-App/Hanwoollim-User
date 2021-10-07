import React from 'react';
import { Dimensions, useWindowDimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';

export type LoadingModalPropsType = {
	isVisible: boolean;
};

export const LoadingModal = ({ isVisible }: LoadingModalPropsType) => {
	const { width } = useWindowDimensions();

	const maxDeviceHeight = Math.max(
		Dimensions.get('window').height,
		Dimensions.get('screen').height,
	);

	return (
		<Modal
			isVisible={isVisible}
			animationIn="fadeIn"
			animationOut="fadeOut"
			backdropColor="rgba(255,255,255,0.60)"
			backdropOpacity={1}
			useNativeDriver
			statusBarTranslucent
			deviceHeight={maxDeviceHeight}
			deviceWidth={width}
			avoidKeyboard>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<ActivityIndicator animating={true} size="small" />
			</View>
		</Modal>
	);
};
