import React from "react";
import {View, Text, Button} from "react-native";

function Initial({navigation}) {
	return (
		<View>
			<Text>{"한울림 어플리케이션에 온 것을 환영합니다!"}</Text>
			<Button
				title="회원 가입 창 가기"
				onPress={() => navigation.navigate("SignUp")}
			/>
		</View>
	);
}

export default Initial;
