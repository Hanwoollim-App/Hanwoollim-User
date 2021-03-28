import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {Item} from "react-native-picker-select";
import {heightPercentage, fontPercentage, widthPercentage} from "../../../../utils/constant/common/design/Responsive";
import weekItem from "../../../../utils/constant/reservation/timeTable/ReservationTimeTableUtil";
import Header from "./Header";
import color from "../../../../utils/constant/common/design/Color";
import Events from "../events/Events";

const COLOR_OF_LINE = "#ced4da";

const styles = StyleSheet.create({
	root: {

	},
	headerContainer: {
		height: heightPercentage(57),
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
	},
	bodyContainer: {
		paddingBottom: heightPercentage(80),
	},
	rowOfWeek: {
		flexDirection: "row",
		paddingTop: heightPercentage(30),
		paddingLeft: widthPercentage(28),
	},
	blank: {
		width: widthPercentage(14),
		height: heightPercentage(20),
		borderWidth: 1,
		borderColor: COLOR_OF_LINE,
		backgroundColor: color.mainColor,
	},
	dayLabel: {
		width: widthPercentage(44),
		height: heightPercentage(20),
		backgroundColor: color.mainColor,
		borderColor: COLOR_OF_LINE,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
	},
	dayLabel_text: {
		fontSize: fontPercentage(12),
		color: "white",
		textAlign: "center",
	},
	timeTable: {
		flexDirection: "row",
		paddingLeft: widthPercentage(28),
	},
	columnOfTime: {
		width: widthPercentage(14),
	},
	timeLabel: {
		width: widthPercentage(14),
		height: heightPercentage(59),
		borderColor: COLOR_OF_LINE,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderBottomWidth: 1,
	},
	timeLabel_text: {
		fontSize: fontPercentage(10),
		textAlign: "right",
	},
	columnLine: {
		position: "absolute",
		width: widthPercentage(44),
		height: heightPercentage(59) * 24,
		borderRightWidth: 1,
		borderColor: COLOR_OF_LINE,
	},
	event: {
		width: widthPercentage(308),
	},
	rowLine: {
		position: "absolute",
		width: widthPercentage(308),
		height: heightPercentage(59),
		borderBottomWidth: 1,
		borderColor: COLOR_OF_LINE,
	},
});

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

	const generateTimes = (pivotTime, endPivotTime) => {
		const times = [];

		for (let i = pivotTime; i < endPivotTime; i += 1) {
			times.push(i);
		}
		return times;
	};
	const times = generateTimes(0, 24);
	const dayOfWeek = ["MON", "TUE", "WEN", "THU", "FRI", "SAT", "SUN"];
	const test = [[{start: "0", end: "1", title: "홍길동"}], [{start: "7", end: "8", title: "고길동"}, {start: "12", end: "13", title: "둘리"}], [{start: "7", end: "8", title: "도우너"}], [], [], [], []];
	// 테스트 : 월 00~01시 홍길동, 화 7~8시 고길동, 화 12~13시 둘리, 수 7~8시 도우너

	return (
		<View style={styles.root}>
			<View style={styles.headerContainer}>
				<Header
					btnListener={reserveBtnListener}
					pickerValue={pickerValue}
					pickerValueChangeListener={pickerValueChangeListener}
				/>
			</View>
			<ScrollView>
				<View style={styles.bodyContainer}>
					<View style={styles.rowOfWeek}>
						<View style={styles.blank}/>
						{dayOfWeek.map((day) => (
							<View key={day} style={styles.dayLabel}>
								<Text style={styles.dayLabel_text}>
									{day}
								</Text>
							</View>
						))}
					</View>
					<View style={styles.timeTable}>
						<View style={styles.columnOfTime}>
							{times.map((time) => (
								<View key={time} style={styles.timeLabel}>
									<Text style={styles.timeLabel_text}>
										{time}
									</Text>
								</View>
							))}
						</View>
						{dayOfWeek.map((day, index) => ( // 세로줄 그리기
							<View key={index}
								style={[
									styles.columnLine, {
										left: widthPercentage(42) + widthPercentage(44) * index,
									},
								]}
							>
							</View>
						))}
						<View style={styles.event}>
							{times.map((time, index) => ( // 가로줄 그리기
								<View key={index}
									style={[
										styles.rowLine, {
											top: heightPercentage(59) * index,
										},
									]}
								>
								</View>
							))}
							<Events events={test}/>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default ReservationTimeTable;
