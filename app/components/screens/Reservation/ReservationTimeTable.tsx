import React from "react";
import {View, Text, Button} from "react-native";

function ReservationTimeTable({navigation}) {
	return (
		<View>
			<Text>{"예약 화면입니다."}</Text>
			<Button
				title="실제 예약하는 화면가기"
				onPress={()=> navigation.navigate("ReservingProcess")}
			/>
		</View>
	);
}

export default ReservationTimeTable;
