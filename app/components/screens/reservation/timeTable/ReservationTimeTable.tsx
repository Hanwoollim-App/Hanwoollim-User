import React, {useState} from "react";
import {View, Text} from "react-native";
import {Item} from "react-native-picker-select";
import weekItem from "../../../../utils/constant/reservation/timeTable/ReservationTimeTableUtil";
import Header from "./Header";


function ReservationTimeTable({navigation}) {
	const [pickerValue, setPickerValue] : [Item, Function] = useState(weekItem[0]);
	const reserveBtnListener = () => {
		navigation.navigate("ReservationProcess", {
			currentWeek: pickerValue.label,
		});
	};
	const pickerValueChangeListener = (value: Item) => {
		setPickerValue(value);
	};

	return (
		<View>
			<Header
				btnListener={reserveBtnListener}
				pickerValue={pickerValue}
				pickerValueChangeListener={pickerValueChangeListener}
			/>
			<Text>{"예약 화면입니다."}</Text>
		</View>
	);
}

export default ReservationTimeTable;
