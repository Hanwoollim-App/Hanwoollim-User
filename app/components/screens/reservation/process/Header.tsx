import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {useNavigation} from "@react-navigation/native";
import CustomBtn from "../../../common/CustomBtn";
import color from "../../../../utils/constant/common/design/Color";
import btnTitle from "../../../../utils/constant/reservation/process/HeaderUtil";

const styles = StyleSheet.create({
	haeder__back__btn: {
		width: "27%",
		height: "26%",
		marginLeft: 16,
	},
	header__back__text: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG3",
		fontSize: 12,
		lineHeight: 16,
		letterSpacing: 0,
		color: color.mainColor,
	},
	header__title: {
		width: "33%",
		height: "33%",
		marginLeft: 111,
	},
	header__title__text: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG4",
		fontSize: 14,
		lineHeight: 19,
		letterSpacing: 0,
	},
});

function Header({currentWeek} : {currentWeek: string}) {
	const navigation = useNavigation();
	const backBtnClickListener = () => {
		navigation.goBack();
	};

	return (
		<>
			<CustomBtn
				title={btnTitle}
				btnStyle={styles.haeder__back__btn}
				titleStyle={styles.header__back__text}
				onClickListener={backBtnClickListener}
			/>
			<View style={styles.header__title}>
				<Text style={styles.header__title__text}>
					{`${currentWeek}`}
				</Text>
			</View>
		</>
	);
}

export default Header;
