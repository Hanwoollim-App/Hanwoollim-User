import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";

const styles = StyleSheet.create({
	rootView: {
		width: "100%",
		height: 57,
		backgroundColor: "#ffffff",
		flexDirection: "row",
		alignItems: "center", // header 안에 있는 Component들은 수직 정렬되어 있음
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

function ReservationTimeTableHeader({btnListener}) {
	return (
		<View style={styles.rootView}>
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
