import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultStyle from '../../utils/constant/common/design/DefaultStyle';
import CustomHeader from './CustomHeader';
import CustomStatusBar from './CustomStatusBar';

function ScreenWrapper({ children }) {
	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={defaultStyle.root} edges={['bottom']}>
				<View style={defaultStyle.header}>
					<CustomHeader />
				</View>
				<View style={defaultStyle.contents}>{children}</View>
			</SafeAreaView>
		</>
	);
}

export default ScreenWrapper;
