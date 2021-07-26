import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultStyle from '../../utils/constant/common/design/DefaultStyle';
import CustomHeader from './CustomHeader';
import CustomStatusBar from './CustomStatusBar';

interface screenWrapper {
	children: React.ReactNode;
	headerTitle?: string;
}

function ScreenWrapper({ children, headerTitle }: screenWrapper) {
	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={defaultStyle.root} edges={['bottom']}>
				<View style={defaultStyle.header}>
					<CustomHeader title={headerTitle ?? undefined} />
				</View>
				<View style={defaultStyle.contents}>{children}</View>
			</SafeAreaView>
		</>
	);
}

export default ScreenWrapper;
