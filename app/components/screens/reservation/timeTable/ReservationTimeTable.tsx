import React, {useState} from "react";
import {View, Text} from "react-native";
import {Item} from "react-native-picker-select";
import Header from "./Header";


function ReservationTimeTable({navigation}) {
	const [pickerValue, setPickerValue] : [Item, Function] = useState({label: "2021. 02. 1주차  ▽", value: "1"});
	const reserveBtnListener = () => {
		navigation.navigate("ReservationProcess", {
			currentWeek: pickerValue.label,
		});
	};

	return (
		<View>
			<Header
				btnListener={reserveBtnListener}
				pickerValue={pickerValue}
				setPickerValue={setPickerValue}
			/>
			<Text>{"예약 화면입니다."}</Text>
		</View>
	);
}

export default ReservationTimeTable;
