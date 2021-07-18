import React from 'react';
import { BackHandler, Text } from 'react-native';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import ScreenWrapper from '../../common/ScreenWrapper';

function Home() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});

	return (
		<ScreenWrapper>
			<Text>홈 화면입니다.</Text>
		</ScreenWrapper>
	);
}

export default Home;
