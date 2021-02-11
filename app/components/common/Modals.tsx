import React from "react";
import {Text, View, Modal, StyleSheet} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import color from "../../utils/constant/common/design/Color";
import CustomBtn from "./CustomBtn";

const styles = StyleSheet.create({
	modalView: {
		justifyContent: "space-between",
		alignItems: "center",
		width: "66%",
		height: "20%",
		marginTop: "80%",
		marginLeft: "17%",
		backgroundColor: "white",
		elevation: 5,
	},
	contentContainer: {
		flex: 7.2,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		backgroundColor: "white",
	},
	btnContainer: {
		flex: 3.8,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "27.5%",
		backgroundColor: "white",
	},
	titleStyle: {
		marginTop: "7%",
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(15),
		letterSpacing: 1,
		fontStyle: "normal",
		textAlign: "center",
		color: "#000000",
	},
	subtitleStyle: {
		marginTop: "3%",
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(10),
		fontStyle: "normal",
		textAlign: "center",
		color: "gray",
	},
	firstBtnStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
		backgroundColor: color.mainColor,
	},
	secondBtnStyle: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	firstBtnTitleStyle: {
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(15),
		fontStyle: "normal",
		textAlign: "center",
		color: "#ffffff",
	},
	secondBtnTitleStyle: {
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(15),
		fontStyle: "normal",
		textAlign: "center",
		color: "#000000",
	},
});

interface ModalsProps {
    mdVisible: boolean,
    modalStyle: Object,
    titleStyle: Object,
    title: string,
    ModalButton: Function,
}

function Modals({mdVisible, modalStyle, titleStyle, title, ModalButton} : ModalsProps) {
	return (
		<Modal
			animationType="slide"
			visible={mdVisible}
		>
			<View style={modalStyle}>
				<Text style={titleStyle}>
					{title}
				</Text>
				{ModalButton}
			</View>
		</Modal>
	);
}

export default React.memo(Modals);
