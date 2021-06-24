import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import {Item} from "react-native-picker-select";
import {heightPercentage} from "../../../../utils/constant/common/design/Responsive";
import weekItem from "../../../../utils/constant/reservation/timeTable/ReservationTimeTableUtil";
import Header from "./Header";

const styles = StyleSheet.create({
	root: {},
	headerContainer: {
		width: "100%",
		height: heightPercentage(57),
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
	},
	bodyContainer: {},
});

function ReservationTimeTable({navigation}) {
	const [pickerValue, setPickerValue]: [Item, Function] = useState(weekItem[0]);
	const reserveBtnListener = () => {
		navigation.navigate("ReservationProcess", {
			currentWeek: pickerValue.label,
		});
	};
	const pickerValueChangeListener = (value: Item) => {
		setPickerValue(value);
	};

	return (
		<View style={styles.root}>
			<View style={styles.headerContainer}>
				<Header
					btnListener={reserveBtnListener}
					pickerValue={pickerValue}
					pickerValueChangeListener={pickerValueChangeListener}
				/>
			</View>
			<View></View>
			<Text>{"예약 화면입니다."}</Text>
		</View>
	);
}

export default ReservationTimeTable;
