import React, {useState, useContext} from "react";
import {useNavigation} from "@react-navigation/native";
import {View, Text, StyleSheet, ScrollView, Dimensions} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import color from "../../../utils/constant/common/design/Color";
import {SIGN_UP_COMPONENT_TEXT, SIGN_UP_ERROR_MESSAGE} from "../../../utils/constant/login/SingUpScreenUtils";
import CustomBtn from "../../common/CustomBtn";
import SignUpForm from "./SignUpForm";
import LoginContext from "../../../utils/context/LoginContext";
import {loginInterface} from "../../../utils/constant/login/LoginUtils";
import CustomModal from "../../common/CustomModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	headerContainer: {
		height: windowHeight * 0.164,
		justifyContent: "center",
		backgroundColor: color.mainColor,
	},
	header: {
		marginLeft: windowWidth * 0.112,
	},
	header__text: {
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(18),
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#ffffff",
	},
	bodyContainer: {
		height: windowHeight * 0.836,
		backgroundColor: "#ffffff",
	},
	welcome: {
		height: windowHeight * 0.107,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	welcome__text: {
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(13),
		letterSpacing: 1,
		textAlign: "center",
		color: color.mainColor,
	},
	inputContainer: {
		height: windowHeight * 0.330,
	},
	input: {
		height: windowHeight * 0.041,
		marginTop: windowHeight * 0.071,
		flexDirection: "row",
		alignItems: "center",
	},
	alert: {
		height: windowHeight * 0.231,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	alert__text: {
		fontFamily: "MalgunGothic",
		fontSize: RFValue(12),
		letterSpacing: 0,
		textAlign: "center",
		color: "#777777",
	},
	signUp: {
		height: windowHeight * 0.166,
		justifyContent: "center",
		alignItems: "center",
	},
	signUp__btn: {
		width: windowWidth * 0.773,
		height: windowHeight * 0.065,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 21,
		backgroundColor: color.mainColor,
	},
	signUp__title: {
		fontFamily: "KoreanYNSJG4",
		fontSize: RFValue(14),
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
		<View style={styles.root}>
			<CustomModal
				mdVisible={modalVisible}
				title={modalText}
				firstButton={() => setModalVisible(false)}
				firstBtnTitle={SIGN_UP_ERROR_MESSAGE.TRY_AGAIN_BTN}
			/>
			<View style={styles.headerContainer}>
				<View style={styles.header}>
					<Text style={styles.header__text}>{SIGN_UP_COMPONENT_TEXT.title}</Text>
				</View>
			</View>
			<ScrollView>
				<View style={styles.bodyContainer}>
					<View style={styles.welcome}>
						<Text style={styles.welcome__text}>{SIGN_UP_COMPONENT_TEXT.welcome}</Text>
					</View>
					<View style={styles.inputContainer}>
						<View style={styles.input}>
							<SignUpForm
								title={SIGN_UP_COMPONENT_TEXT.inputTitle.name}
								inputChangeListener={(value : string) => setName(value)}
								defalutValue={name}
							/>
						</View>
						<View style={styles.input}>
							<SignUpForm
								title={SIGN_UP_COMPONENT_TEXT.inputTitle.major}
								inputChangeListener={(value: string) => setMajor(value)}
								defalutValue={major}
							/>
						</View>
						<View style={styles.input}>
							<SignUpForm
								title={SIGN_UP_COMPONENT_TEXT.inputTitle.studentID}
								inputChangeListener={(value: string) => setStudentID(value)}
								defalutValue={studentID}
							/>
						</View>
					</View>
					<View style={styles.alert}>
						<Text style={styles.alert__text}>
							{SIGN_UP_COMPONENT_TEXT.alert}
						</Text>
					</View>
					<View style={styles.signUp}>
						<CustomBtn
							title={SIGN_UP_COMPONENT_TEXT.signUpBtn}
							onClickListener={signUpBtnClickListener}
							titleStyle={styles.signUp__title}
							btnStyle={styles.signUp__btn}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}


export default SignUp;
