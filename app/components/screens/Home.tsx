import React, {useEffect} from "react";
import {View, Text, BackHandler} from "react-native";

function Home() {
	useEffect(() => {
		const backAction = () => {
			BackHandler.exitApp();
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction,
		);

		return () => backHandler.remove();
	}, []);

	return (
		<View>
			<Text>{"홈 화면입니다."}</Text>
		</View>
	);
}

export default Home;
