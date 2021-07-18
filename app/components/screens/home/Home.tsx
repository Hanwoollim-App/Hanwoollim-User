import React from 'react';
import { StyleSheet, BackHandler, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAndroidBackHandler } from 'react-navigation-backhandler';
import defaultStyle from '../../../utils/constant/common/design/DefaultStyle';
import CustomHeader from '../../common/CustomHeader';
import CustomStatusBar from '../../common/CustomStatusBar';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		width: '100%',
	},
});

function Home() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={styles.root}>
				<View style={defaultStyle.header}>
					<CustomHeader />
				</View>
				<Text>홈화면입니다.</Text>
			</SafeAreaView>
		</>
	);
}

export default Home;
