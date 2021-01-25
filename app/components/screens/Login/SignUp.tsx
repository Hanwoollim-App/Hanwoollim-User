import React, {useState} from "react";
import {View, Text, Button, TextInput, StyleSheet} from "react-native";

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
});

function SignUp({navigation}) {
	const [name, setName] : [string, Function] = useState("");
	const [major, setMajor] : [string, Function] = useState("");
	const [studentID, setStudentID] : [string, Function] = useState("");
    const signUpBtnClickListenr = () => {
        console.log(name);
        console.log(major);
        console.log(studentID);
    };

	return (
		<View>
			<Text>{"한울림 어플리케이션에 온 것을 환영합니다!"}</Text>
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
