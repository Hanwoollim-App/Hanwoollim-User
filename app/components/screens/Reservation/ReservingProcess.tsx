import React from "react";
import {View, StyleSheet, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import CustomBtn from "../../common/CustomBtn";
import ReservationProcessHeader from "./ReservationProcessHeader";
import ReservationProcessSelectForm from "./ReservationProcessSelectForm";

const pickerStyle = StyleSheet.create({
	inputIOS: {
		width: "100%",
		height: "100%",
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
	},
});


const styles = StyleSheet.create({
	rootView: {
		flex: 1,
	},
	picker: {
		width: 113,
		height: 26,
		marginLeft: 25,
		marginTop: 29,
		borderWidth: 1,
		borderColor: "#00203f",
	},
	timeBox: {
		width: 327,
		height: 41,
		marginLeft: 24,
		marginTop: 17,
		borderRadius: 12,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bdbdbd",
	},
	reservationForm: {

	},
})

const dayItems = [{label: "월요일", value: "1"}, {label: "화요일", value: "2"}, {label: "수요일", value: "3"}, {label: "목요일", value: "4"}, {label: "금요일", value: "5"}, {label: "토요일", value: "6"}, {label: "일요일", value: "7"}];

function ReservingProcess({route}) {
	const {currentWeek} : any = route.params; // ts 형식으로 바꿀 필요 있음


	return (
		<View style={styles.rootView}>
			<ReservationProcessHeader
				currentWeek={currentWeek}
			/>
			<View style={styles.picker}>
				<RNPickerSelect
					placeholder={{}}
					style={pickerStyle}
					items={dayItems}
					value={dayItems[0]}
					onValueChange={() => console.log(dayItems)}
				/>
			</View>
			<View style={styles.timeBox}>
				<Text> {`시간들이 들어갈 공간`}</Text>
			</View>
			<View style={styles.reservationDefaultInfo}>
				<ReservationProcessSelectForm/>
				<ReservationProcessSelectForm/>
				<Text>{`하루에 개인당 최대 한시간만 예약이 가능합니다`}</Text>
			</View>
			<View>
				<View>
					<ReservationProcessSelectForm/>
				</View>
				<CustomBtn
					title={}
					onClickListener={}
					titleStyle={}
					btnStyle={}
				/>
			</View>

			<CustomBtn
				title={}
				onClickListener={}
				titleStyle={}
				btnStyle={}
			/>
		</View>
	);
}

export default ReservingProcess;
