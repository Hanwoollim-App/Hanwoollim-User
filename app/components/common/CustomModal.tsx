import React from "react";
import {Text, View, Modal, StyleSheet} from "react-native";
import color from "../../utils/constant/common/design/Color";
import CustomBtn from "./CustomBtn";
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from "../../utils/constant/common/design/Responsive";

const styles = StyleSheet.create({
	modalView: {
		width: widthPercentage(250),
		height: heightPercentage(159),
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: heightPercentage(327),
		marginLeft: widthPercentage(63),
		backgroundColor: "white",
		elevation: 5,
	},
	contentContainer: {
		height: heightPercentage(115),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	btnContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: heightPercentage(44),
		backgroundColor: "white",
	},
	titleStyle: {
		marginTop: heightPercentage(25),
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(15),
		letterSpacing: 1,
		fontStyle: "normal",
		textAlign: "center",
		color: "#000000",
	},
	subtitleStyle: {
		marginTop: heightPercentage(15),
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(10),
		fontStyle: "normal",
		textAlign: "center",
		color: "gray",
	},
	firstBtnStyle: {
		flex: 1,
		height: heightPercentage(44),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: color.mainColor,
	},
	secondBtnStyle: {
		flex: 1,
		height: heightPercentage(44),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	firstBtnTitleStyle: {
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(15),
		fontStyle: "normal",
		textAlign: "center",
		color: "#ffffff",
	},
	secondBtnTitleStyle: {
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(15),
		fontStyle: "normal",
		textAlign: "center",
		color: "#000000",
	},
});

interface ModalsProps {
	mdVisible: boolean;
	title: string;
	subtitle?: string;
	firstButton: Function;
	secondButton?: Function;
	firstBtnTitle: string;
	secondBtnTitle?: string;
}

function CustomModal({
	mdVisible,
	title,
	subtitle = null,
	firstButton,
	secondButton = null,
	firstBtnTitle,
	secondBtnTitle = null,
}: ModalsProps) {
	return (
		<Modal animationType="slide" visible={mdVisible} transparent={true}>
			<View style={styles.modalView}>
				<View style={styles.contentContainer}>
					<Text style={styles.titleStyle}>{title}</Text>
					<Text style={styles.subtitleStyle}>{subtitle}</Text>
				</View>
				<View style={styles.btnContainer}>
					<CustomBtn
						title={firstBtnTitle}
						onClickListener={firstButton}
						titleStyle={styles.firstBtnTitleStyle}
						btnStyle={styles.firstBtnStyle}
					/>
					{secondButton ? (
						<CustomBtn
							title={secondBtnTitle}
							onClickListener={secondButton}
							titleStyle={styles.secondBtnTitleStyle}
							btnStyle={styles.secondBtnStyle}
						/>
					) : (
						<View />
					)}
				</View>
			</View>
		</Modal>
	);
}

export default React.memo(CustomModal);
