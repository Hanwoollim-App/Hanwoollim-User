import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CustomBtn from "../../common/CustomBtn";
import color from "./../../../utils/constant/common/design/Color";

const styles = StyleSheet.create({
	rootView: {
		width: "100%",
		height: 57,
		flexDirection: "row",
		alignItems: "center",
		borderBottomColor: "black",
		borderWidth: 1, // 임시로 구별하기 위해서 만들어놓았습니다. 작업이 다 끝나면 없앨 예정입니다.
	},
	backBtn: {
		width: "27%",
		height: "26%",
		marginLeft: 16,
	},
	backBtnTitle: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG3",
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0,
		color: color.mainColor,
	},
	headerTitleView: {
		width: "33%",
		height: "33%",
		marginLeft: 111,
	},
	headerTitleText: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG4",
		fontSize: 14,
		lineHeight: 19,
		letterSpacing: 0,
	},
});

function ReservationProcessHeader({currentWeek} : {currentWeek: string}) {
	const navigation = useNavigation();
	const backBtnClickListener = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.rootView}>
			<CustomBtn
				title={`ᐸ  홈으로 돌아가기`}
				titleStyle={styles.backBtnTitle}
				btnStyle={styles.backBtn}
				onClickListener={backBtnClickListener}
			/>
			<View style={styles.headerTitleView}>
				<Text style={styles.headerTitleText}>
					{`${currentWeek}`}
				</Text>
			</View>
		</View>
	);
}

export default ReservationProcessHeader;
