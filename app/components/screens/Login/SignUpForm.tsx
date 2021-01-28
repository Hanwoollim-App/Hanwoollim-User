import React from "react";
import {View, StyleSheet, Text, TextInput} from "react-native";


interface signUpFormProps {
    title: string,
    onChangeListener: Function,
    defalutValue : string,
}
const styles = StyleSheet.create({
	inputSection: {
		flexDirection: "row",
		height: 33,
		marginTop: 58,
	},
	inputTitle: {
		width: 27,
		height: 18,
		fontSize: 14,
		letterSpacing: 0,
		textAlign: "left",
		marginTop: "auto",
		marginBottom: "auto",
		marginLeft: 42,
		marginRight: 31,
	},
	inputField: {
		width: 233,
		height: 33,
		borderColor: "#707070",
		borderWidth: 1,
	},
});

function SignUpForm({title, onChangeListener, defalutValue} : signUpFormProps) {
	return (
		<View style={styles.inputSection}>
			<Text style={styles.inputTitle}>{title}</Text>
			<TextInput
				style={styles.inputField}
				onChangeText={(newValue : string) => onChangeListener(newValue)}
				value={defalutValue}
			/>
		</View>
	);
}

export default SignUpForm;
