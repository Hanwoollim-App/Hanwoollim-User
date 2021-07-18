import React from 'react';
import { BackHandler, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import defaultStyle from '../../../utils/constant/common/design/DefaultStyle';
import CustomHeader from '../../common/CustomHeader';
import CustomStatusBar from '../../common/CustomStatusBar';

function Home() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={defaultStyle.root} edges={['bottom']}>
				<View style={defaultStyle.header}>
					<CustomHeader />
				</View>
				<View style={defaultStyle.contents}>
					<Text>홈화면입니다.</Text>
				</View>
			</SafeAreaView>
		</>
	);
}

export default Home;
