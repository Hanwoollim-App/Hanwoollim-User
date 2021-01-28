import React, {useState} from "react";
import {View, Text, Button, StyleSheet, Modal} from "react-native";
import CustomBtn from "./CustomBtn";
import SignUpForm from "./SignUpForm";

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
		backgroundColor: "#00203f",
	},
	headerTitle: {
		width: 94,
		height: 27,
		marginLeft: 30,
		marginTop: 49,
		fontSize: 20,
		fontWeight: "normal",
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
		textAlign: "center",
		color: "#00203f",
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
		height: 50,
		fontSize: 13,
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
		backgroundColor: "#00203f",
		justifyContent: "center",
		alignItems: "center",
	},
	singUpTitle: {
		width: 96,
		height: 20,
		lineHeight: 22,
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
	},
});

function SignUp({navigation, route}) {
	const [name, setName] : [string, Function] = useState("");
	const [major, setMajor] : [string, Function] = useState("");
	const [studentID, setStudentID] : [string, Function] = useState("");
	const [modalVisible, setModalVisible] : [boolean, Function] = useState(false);
	const [modalText, setModalText]: [string, Function] = useState("");
	const {profile} = route.params;

	const signUpBtnClickListener = () => {
		// 빠짐없이 기입했는지 check.
		if (name === "" || major === "" || studentID === "") {
			setModalVisible(true);
			setModalText(`빠짐없이 채워주세요!`);
			return;
		}
		// studentID 10자리인지 check
		if (studentID.length !== 10) {
			setModalVisible(true);
			setModalText(`학번은 10자리입니다!`);
			return;
		}

		// studentID 앞의 4자리 check
		const curDate = new Date();
		const curYear = curDate.getFullYear();
		const inputYear = parseInt(studentID.slice(0, 4), 10);

		if (inputYear > curYear) {
			setModalVisible(true);
			setModalText(`학번이 이상해요!`);
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
		navigation.navigate("ReservationNavigator")
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
				<Text style={styles.headerTitle}>{`환영합니다`}</Text>
			</View>
			<View style={styles.welcomeView}>
				<Text style={styles.welcomText}>{`한울림의 식구가 되신 것을 환영합니다!\n당신이 누구인지 알려줄래요?`}</Text>
			</View>
			<SignUpForm
				title={`이름`}
				onChangeListener={(value : string) => setName(value)}
				defalutValue={name}
			/>
			<SignUpForm
				title={`학과`}
				onChangeListener={(value: string) => setMajor(value)}
				defalutValue={major}
			/>
			<SignUpForm
				title={`학번`}
				onChangeListener={(value: string) => setStudentID(value)}
				defalutValue={studentID}
			/>
			<View style={styles.alertTextView}>
				<Text style={styles.alertText}>
					{`허위 사실 기재 및 한울림 부원이 아닌 것으로\n확인 될 시 관리자에 의해 활동이 제한 될 수 있습니다.
					`}
				</Text>
			</View>
			<View style={styles.singupView}>
				<CustomBtn
					title={`계정 생성하기`}
					onClickListener={signUpBtnClickListener}
					titleStyle={styles.singUpTitle}
					btnStyle={styles.singUpBtn}
				/>
			</View>


		</View>
	);
}


export default SignUp;
