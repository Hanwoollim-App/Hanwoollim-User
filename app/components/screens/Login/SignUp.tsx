import React, {useState} from "react";
import {View, Text, Button, TextInput, StyleSheet, Modal} from "react-native";

const styles = StyleSheet.create({
	inputSection: {
		marginTop: 20,
		width: "80%",
		height: 60,
		flexDirection: "row",
	},
	inputTitle: {
		flex: 1,
	},
	inputField: {
		flex: 4,
		borderColor: "gray",
		borderWidth: 1,
	},
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
			console.log(inputYear,curYear);
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
			<View style={styles.inputSection}>
				<Text style={styles.inputTitle}>{`이름`}</Text>
				<TextInput
					style={styles.inputField}
					onChangeText={(newName) => setName(newName)}
					value={name}
				/>
			</View>
			<View style={styles.inputSection}>
				<Text style={styles.inputTitle}>{`학과`}</Text>
				<TextInput
					style={styles.inputField}
					onChangeText={(newMajor) => setMajor(newMajor)}
					value={major}
				/>
			</View>
			<View style={styles.inputSection}>
				<Text style={styles.inputTitle}>{`학번`}</Text>
				<TextInput
					style={styles.inputField}
					onChangeText={(newStudentID) => setStudentID(newStudentID)}
					value={studentID}/>
			</View>
			<Button
				title="회원가입하기!"
				onPress={signUpBtnClickListenr}
			/>

		</View>
	);
}


export default SignUp;
