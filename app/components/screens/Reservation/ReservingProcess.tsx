import React from "react";
import {View, StyleSheet, Text} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {useNavigation} from "@react-navigation/native";
import CustomBtn from "../../common/CustomBtn";
import ReservationProcessHeader from "./ReservationProcessHeader";
import ReservationProcessSelectForm from "./ReservationProcessSelectForm";
import color from "../../../utils/constant/common/design/Color";

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
	dayPicker: {
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
	reservationDefaultInfo: {
		width: 327,
		height: 151,
		marginTop: 15,
		borderRadius: 11,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bdbdbd",
	},
	reservationSectionInfo: {
		width: 327,
		height: 118,
		marginTop: 13,
		borderRadius: 11,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#bdbdbd",
	},
	alertText: {
		width: 164,
		height: 8,
		marginTop: 8,
		fontFamily: "KoreanYNSJG2",
		fontSize: 8,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 11,
		letterSpacing: 0,
		textAlign: "left",
		color: "#363636",
	},
	addBtn: {
		width: 130,
		height: 12,
		marginTop: 23,
	},
	addBtnText: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG4",
		fontSize: 12,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 16,
		letterSpacing: 0,
		textAlign: "left",
		color: color.mainColor,
	},
	submitView: {
		width: 290,
		height: 42,
		marginTop: 265,
		borderRadius: 21,
		backgroundColor: color.mainColor,
	},
	submitViewBtn: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	sumbitViewText: {
		width: 78,
		height: 13,
		fontFamily: "KoreanYNSJG4",
		fontSize: 13,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 18,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});

const dayItems = [{label: "월요일", value: "1"}, {label: "화요일", value: "2"}, {label: "수요일", value: "3"}, {label: "목요일", value: "4"}, {label: "금요일", value: "5"}, {label: "토요일", value: "6"}, {label: "일요일", value: "7"}];
const unitItems = [{label: "개인", value: "1"}, {label: "팀", value: "2"}];
const sectionItems = [{label: "드럼", value: "1"}, {label: "기타", value: "2"}, {label: "베이스", value: "3"}, {label: "건반", value: "4"}, {label: "보컬", value: "5"}];
const timeItems = [];

for (let i = 0; i < 24; i++) {
	timeItems.push({label: `${i}시`, value: `${i + 1}`});
}

function ReservingProcess({route}) {
	const navigation = useNavigation();
	const {currentWeek}: any = route.params; // ts 형식으로 바꿀 필요 있음
	const onUnitChangeListener = (value) => {
		console.log(value);
	};
	const onTimeChangeListener = (value) => {
		console.log(value);
	};
	const onSectionChangeListener = (value) => {
		console.log(value);
	};
	const onSectionAddBtnClickListener = () => {
		console.log("추가!");
	};
	const onsumbitBtnClickListener = () => {
		navigation.navigate("BottomTabNavigator", {
			screen: "Home",
		});
	};

	return (
		<View style={styles.rootView}>
			<ReservationProcessHeader
				currentWeek={currentWeek}
			/>
			<View style={styles.dayPicker}>
				<RNPickerSelect
					placeholder={{}}
					style={pickerStyle}
					items={dayItems}
					value={dayItems[0]}
					onValueChange={(value) => console.log(value)}
				/>
			</View>
			<View style={styles.timeBox}>
				<Text> {`시간들이 들어갈 공간`}</Text>
			</View>
			<View style={styles.reservationDefaultInfo}>
				<ReservationProcessSelectForm
					title={`예약 단위`}
					pickerProps={{
						placeholder: {},
						style: pickerStyle,
						items: unitItems,
						value: unitItems[0],
						onValueChange: onUnitChangeListener,
					}}
				/>
				<ReservationProcessSelectForm
					title={`예약 시간`}
					pickerProps={{
						placeholder: {},
						style: pickerStyle,
						items: timeItems,
						value: timeItems[0],
						onValueChange: onTimeChangeListener,
					}}
				/>
				<Text style={styles.alertText}>
					{`하루에 개인당 최대 한시간만 예약이 가능합니다`}
				</Text>
			</View>
			<View style={styles.reservationSectionInfo}>
				<View>
					<ReservationProcessSelectForm
						title={`세션 1`}
						pickerProps={{
							placeholder: {},
							style: pickerStyle,
							items: sectionItems,
							value: sectionItems[0],
							onValueChange: onSectionChangeListener,
						}}
					/>
				</View>
				<CustomBtn
					title={`세션 추가하기 (최대 2개)`}
					onClickListener={onSectionAddBtnClickListener}
					btnStyle={styles.addBtn}
					titleStyle={styles.addBtnText}
				/>
			</View>
			<View style={styles.submitView}>
				<CustomBtn
					title={`예약 확정하기`}
					onClickListener={onsumbitBtnClickListener}
					titleStyle={styles.sumbitViewText}
					btnStyle={styles.submitViewBtn}
				/>
			</View>
		</View>
	);
}

export default ReservingProcess;
