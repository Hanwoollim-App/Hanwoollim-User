import React, {useState, useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, ScrollView} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import color from "../../../utils/constant/common/design/Color";
import {SIGN_UP_COMPONENT_TEXT, SIGN_UP_ERROR_MESSAGE} from "../../../utils/constant/login/SingUpScreenUtils";
import CustomBtn from "../../common/CustomBtn";
import SignUpForm from "./SignUpForm";
import LoginContext from "../../../utils/context/LoginContext";
import {loginInterface} from "../../../utils/constant/login/LoginUtils";
import Modals from "../../common/Modals";

const styles = StyleSheet.create({
	rootView: {
		flex: 1,
	},
	headerView: {
		justifyContent: "center",
		width: "100%",
		height: "16.5%",
		backgroundColor: color.mainColor,
	},
	headerText: {
		marginLeft: "8%",
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(18),
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#ffffff",
	},
	welcomeView: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "7%",
		marginTop: "12%",
	},
	welcomText: {
		width: "100%",
		height: "100%",
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(12),
		letterSpacing: 1,
		textAlign: "center",
		color: color.mainColor,
	},
	alertTextView: {
		marginTop: "23%",
		justifyContent: "center",
		width: "100%",
		height: "7%",
		alignItems: "center",
	},
	alertText: {
		width: "100%",
		height: "100%",
		fontFamily: "MalgunGothic",
		fontSize: RFValue(12),
		letterSpacing: 0,
		textAlign: "center",
		color: "#777777",
	},
	singupView: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "8%",
		marginTop: "4%",
	},
	singUpBtn: {
		justifyContent: "center",
		alignItems: "center",
		width: "77%",
		height: "100%",
		borderRadius: 21,
		backgroundColor: color.mainColor,
	},
	singUpText: {
		fontFamily: "KoreanYNSJG4",
		fontSize: RFValue(14),
		lineHeight: 22,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});

function SignUp() {
	const navigation = useNavigation();
	const [name, setName] : [string, Function] = useState("");
	const [major, setMajor] : [string, Function] = useState("");
	const [studentID, setStudentID] : [string, Function] = useState("");
	const [modalVisible, setModalVisible] : [boolean, Function] = useState(false);
	const [modalText, setModalText]: [string, Function] = useState("");
	const login: loginInterface = useContext(LoginContext);
	const [profile] = login.profile;

	const signUpBtnClickListener = () => {
		// 빠짐없이 기입했는지 check.
		if (name === "" || major === "" || studentID === "") {
			setModalVisible(true);
			setModalText(SIGN_UP_ERROR_MESSAGE.INPUT_EMPTY);
			return;
		}
		// studentID 10자리인지 check
		if (studentID.length !== 10) {
			setModalVisible(true);
			setModalText(SIGN_UP_ERROR_MESSAGE.STUDENT_ID_NOT_10_LENGTH);
			return;
		}

		// studentID 앞의 4자리 check
		const curDate = new Date();
		const curYear = curDate.getFullYear();
		const inputYear = parseInt(studentID.slice(0, 4), 10);

		if (inputYear > curYear) {
			setModalVisible(true);
			setModalText(SIGN_UP_ERROR_MESSAGE.STUDENT_ID_INVALID);
			return;
		}

		const data = {
			name,
			major,
			studentID,
			kakaoID: profile.id,
			postion: 0,
		};

		console.log(data);

		// const endpoint = "localhost:3000";

		// fetch(endpoint, {
		// 	method: "GET",
		// 	mode: "no-cors",
		// 	body: JSON.stringify(data),
		// })
		// 	.then((res) => res.json())
		//   	.then((resJson) => console.log(resJson));
		navigation.navigate("BottomTabNavigator", {
			screen: "Home",
		});
	};

	return (
		<View style={styles.rootView}>
			<Modals
				mdVisible={modalVisible}
				modalStyle={styles.modalView}
				titleStyle={styles.modalTitleStyle}
				title={modalText}
				ModalButton={<CustomBtn
					title={SIGN_UP_ERROR_MESSAGE.TRY_AGAIN_BTN}
					onClickListener={() => setModalVisible(false)}
					titleStyle={styles.modalBtnTitleStyle}
					btnStyle={styles.modalBtnStyle}
				/>}
			/>
			<View style={styles.headerView}>
				<Text style={styles.headerText}>{SIGN_UP_COMPONENT_TEXT.title}</Text>
			</View>
			<ScrollView>
				<View style={styles.welcomeView}>
					<Text style={styles.welcomText}>{SIGN_UP_COMPONENT_TEXT.welcome}</Text>
				</View>
				<SignUpForm
					title={SIGN_UP_COMPONENT_TEXT.inputTitle.name}
					onChangeListener={(value : string) => setName(value)}
					defalutValue={name}
				/>
				<SignUpForm
					title={SIGN_UP_COMPONENT_TEXT.inputTitle.major}
					onChangeListener={(value: string) => setMajor(value)}
					defalutValue={major}
				/>
				<SignUpForm
					title={SIGN_UP_COMPONENT_TEXT.inputTitle.studentID}
					onChangeListener={(value: string) => setStudentID(value)}
					defalutValue={studentID}
				/>
				<View style={styles.alertTextView}>
					<Text style={styles.alertText}>
						{SIGN_UP_COMPONENT_TEXT.alert}
					</Text>
				</View>
				<View style={styles.singupView}>
					<CustomBtn
						title={SIGN_UP_COMPONENT_TEXT.signUpBtn}
						onClickListener={signUpBtnClickListener}
						titleStyle={styles.singUpText}
						btnStyle={styles.singUpBtn}
					/>
				</View>
			</ScrollView>
		</View>
	);
}


export default SignUp;
