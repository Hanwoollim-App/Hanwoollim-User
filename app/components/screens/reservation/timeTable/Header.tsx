import React from "react";
import {View, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import weekItem from "../../../../utils/constant/reservation/timeTable/ReservationTimeTableUtil";
import CustomBtn from "../../../common/CustomBtn";
import {fontPercentage, heightPercentage, widthPercentage} from "../../../../utils/constant/common/design/Responsive";

// 라이브러리용 StyleSheet
const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(10),
		lineHeight: fontPercentage(16),
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
	},
	inputAndroid: {
		width: "100%",
		height: "100%",
		paddingVertical: 3,
		fontSize: fontPercentage(12),
		fontFamily: "KoreanYNSJG3",
		lineHeight: fontPercentage(12),
		letterSpacing: 0,
		textAlign: "center",
		color: "#000000",
	},
});

const styles = StyleSheet.create({
	picker: {
		width: widthPercentage(138),
		height: heightPercentage(35),
		marginLeft: widthPercentage(28),
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: fontPercentage(1),
		borderColor: "#00203f",
		justifyContent: "center",
	},
	reserve: {
		marginLeft: widthPercentage(100),
		width: widthPercentage(95),
		height: heightPercentage(28),
	},
	reserve__btn: {
		width: "100%",
		height: "100%",
		borderRadius: fontPercentage(20),
		backgroundColor: "#00203f",
		alignItems: "center",
		justifyContent: "center",
	},
	reserve__text: {
		width: widthPercentage(40),
		height: heightPercentage(16),
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(10),
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: fontPercentage(16),
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});


function Header({btnListener, pickerValue, pickerValueChangeListener}) {
	return (
		<>
			<View style={styles.picker}>
				<RNPickerSelect
					style={pickerSelectStyles}
					useNativeAndroidPickerStyle={false}
					onValueChange={(value) => {
						pickerValueChangeListener(weekItem[value - 1]);
					}}
					placeholder={{}}
					value={pickerValue.value}
					items={weekItem}
				/>
			</View>
			<View style={styles.reserve}>
				<CustomBtn
					title={`예약하기`}
					onClickListener={btnListener}
					btnStyle={styles.reserve__btn}
					titleStyle={styles.reserve__text}
				/>
			</View>
		</>
	);
}

export default React.memo(Header);
