import React, {useState} from "react";
import {View, Text} from "react-native";
import ReservationTimeTableHeader from "./ReservationTimeTableHeader";

interface pickerValueInteface {
	label: string, // "1"->이번주, "2"->다음주
	value: string,
}

function ReservationTimeTable({navigation}) {
	const [pickerValue, setPickerValue] : [pickerValueInteface, Function] = useState({label: "2021. 02. 1주차  ▽", value: "1"});
	const reserveBtnListener = () => {
		navigation.navigate("ReservingProcess");
	};

	return (
		<View>
			<ReservationTimeTableHeader
				btnListener={reserveBtnListener}
				pickerValue={pickerValue}
				setPickerValue={setPickerValue}
			/>
			<Text>{"예약 화면입니다."}</Text>
		</View>
	);
}

export default ReservationTimeTable;
