import React from "react";
import {View, Text, BackHandler} from "react-native";
import {useAndroidBackHandler} from "react-navigation-backhandler";

function Home() {
	useAndroidBackHandler(() => {
		BackHandler.exitApp();
		return true;
	});

	return (
		<View>
			<Text>{"홈 화면입니다."}</Text>
		</View>
	);
}

export default Home;
