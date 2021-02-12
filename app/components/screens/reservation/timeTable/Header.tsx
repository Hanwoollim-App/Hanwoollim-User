import React from "react";
import {View, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import weekItem from "../../../../utils/constant/reservation/timeTable/ReservationTimeTableUtil";
import CustomBtn from "../../../common/CustomBtn";

// 라이브러리
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		width: 138,
		height: 26,
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
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
	picker: {
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


function Header({btnListener, pickerValue, pickerValueChangeListener}) {
	return (
		<View style={styles.rootView}>
			<View style={styles.picker}>
				<RNPickerSelect
					style={pickerSelectStyles}
					onValueChange={(value) => {
						pickerValueChangeListener(weekItem[value - 1]);
					}}
					placeholder={{}}
					value={pickerValue.value}
					items={weekItem}
				/>
			</View>
			<View style={styles.reserveBtnView}>
				<CustomBtn
					title={`예약하기`}
					onClickListener={btnListener}
					titleStyle={styles.reserveBtnText}
					btnStyle={styles.reserveBtn}
				/>
			</View>
		</View>
	);
}

export default React.memo(Header);
