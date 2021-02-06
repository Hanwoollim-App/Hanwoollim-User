import React, { useState } from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";

// 라이브러리
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		width: 138,
		height: 26,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#00203f",
		textAlign: "center",
		fontFamily: "KoreanYNSJG3",
		fontSize: 12,
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#00203f",
		textAlign: "center",
		fontFamily: "KoreanYNSJG3",
		fontSize: 12,
	},
});

const styles = StyleSheet.create({
	rootView: {
		width: "100%",
		height: 57,
		backgroundColor: "#ffffff",
		flexDirection: "row",
		alignItems: "center", // header 안에 있는 Component들은 수직 정렬되어 있음
	},
	picker:{
		width: 138,
		height: 26,
		marginLeft: 28,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#00203f",
	},
	reserveBtnView: {
		marginLeft: 100,
		width: 95,
		height: 28,
	},
	reserveBtn: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
		backgroundColor: "#00203f",
		alignItems: "center",
		justifyContent: "center",
	},
	reserveBtnText: {
		width: 46,
		height: 16,
		fontFamily: "KoreanYNSJG3",
		fontSize: 10,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 16,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});

interface pickerValueInteface {
	label: string, // "1"->이번주, "2"->다음주
	value: string,
}

function ReservationTimeTableHeader({btnListener}) {
	const [pickerValue, setPickerValue] : [pickerValueInteface, Function] = useState({label: "2021. 02. 1주차  ▽", value: "1"});


	return (
		<View style={styles.rootView}>
			<View style={styles.picker}>
				<RNPickerSelect
					style={pickerSelectStyles}
					onValueChange={(value) => setPickerValue(value)}
					placeholder={{}}
					value={pickerValue.value}
					items={[{label: "2021. 02. 1주차  ▽", value: "1"}, {label: "2021. 02. 2주차  ▽", value: "2"}]}
				/>
			</View>
			<View style={styles.reserveBtnView}>
				<TouchableOpacity
					style={styles.reserveBtn}
					onPress={btnListener}
				>
					<Text style={styles.reserveBtnText}>{`예약하기`}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default ReservationTimeTableHeader;
