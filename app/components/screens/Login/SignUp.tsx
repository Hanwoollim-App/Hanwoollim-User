import React, {useState} from "react";
import {View, Text, Button, StyleSheet, Modal} from "react-native";
import SignUpForm from "./SignUpForm";

const styles = StyleSheet.create({
	modalView: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 20,
	},
});

function SignUp({navigation, route}) {
	const [name, setName] : [string, Function] = useState("");
	const [major, setMajor] : [string, Function] = useState("");
	const [studentID, setStudentID] : [string, Function] = useState("");
	const [modalVisible, setModalVisible] : [boolean, Function] = useState(false);
	const [modalText, setModalText]: [string, Function] = useState("");
	const {profile} = route.params;

	const signUpBtnClickListenr = () => {
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
			<Text>{"로그인 화면!"}</Text>
			<Button
				title="메인 화면 가기"
				onPress={() => navigation.navigate("ReservationNavigator")}
			/>
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
			<Button
				title="회원가입하기!"
				onPress={signUpBtnClickListenr}
			/>

		</View>
	);
}


export default SignUp;
