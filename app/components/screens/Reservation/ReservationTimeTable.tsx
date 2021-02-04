import React from "react";
import {View, Text} from "react-native";
import ReservationTimeTableHeader from "./ReservationTimeTableHeader";

function ReservationTimeTable({navigation}) {
	const reserveBtnListener = () => {
		navigation.navigate("ReservingProcess");
	};

	return (
		<View>
			<ReservationTimeTableHeader
				btnListener={reserveBtnListener}
			/>
			<Text>{"예약 화면입니다."}</Text>
		</View>
	);
}

export default ReservationTimeTable;
