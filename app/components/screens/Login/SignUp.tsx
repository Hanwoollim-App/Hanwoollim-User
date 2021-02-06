import React, {useState, useContext} from "react";
import {View, Text, Button, StyleSheet, Modal} from "react-native";
import color from "../../../utils/design/Color";
import {SIGN_UP_COMPONENT_TEXT, SIGN_UP_ERROR_MESSAGE} from "../../../utils/Login/SingUpScreenUtils";
import CustomBtn from "../../common/CustomBtn";
import SignUpForm from "./SignUpForm";
import LoginContext from "./../../../context/LoginContext";
import {loginInterface} from "../../../utils/Login/LoginUtils";

const styles = StyleSheet.create({
	modalView: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 20,
	},
	headerView: {
		width: "100%",
		height: 133.9,
		backgroundColor: color.mainColor,
	},
	headerText: {
		width: 94,
		height: 27,
		marginLeft: 30,
		marginTop: 49,
		fontSize: 18,
		fontFamily: "KoreanYNSJG3",
		fontStyle: "normal",
		lineHeight: 27,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
	welcomeView: {
		width: "100%",
		height: 35,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 51.2,
	},
	welcomText: {
		width: 252,
		height: "100%",
		fontFamily: "KoreanYNSJG3",
		textAlign: "center",
		color: color.mainColor,
	},
	alertTextView: {
		width: "100%",
		height: 34,
		marginTop: 154,
		justifyContent: "center",
		alignItems: "center",
	},
	alertText: {
		width: 316,
		height: 34,
		fontFamily: "MalgunGothic",
		fontSize: 12,
		letterSpacing: 0,
		lineHeight: 17,
		textAlign: "center",
		color: "#777777",
	},
	singupView: {
		width: "100%",
		height: 53,
		marginTop: 36,
		justifyContent: "center",
		alignItems: "center",
	},
	singUpBtn: {
		width: 290,
		height: "100%",
		borderRadius: 21,
		backgroundColor: color.mainColor,
		justifyContent: "center",
		alignItems: "center",
	},
	singUpText: {
		width: 96,
		height: 20,
		fontFamily: "KoreanYNSJG4",
		lineHeight: 22,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});

function SignUp({navigation}) {
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
		navigation.navigate("ReservationNavigator");
	};

	return (
		<View>
			<Modal
				animationType="slide"
				visible={modalVisible}
			>
				<View style={styles.modalView}>
					<Text>{modalText}</Text>
					<Button
						title={`다시 입력하기`}
						onPress={() => setModalVisible(false)}
					/>
				</View>
			</Modal>
			<View style={styles.headerView}>
				<Text style={styles.headerText}>{SIGN_UP_COMPONENT_TEXT.title}</Text>
			</View>
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
		</View>
	);
}


export default SignUp;
