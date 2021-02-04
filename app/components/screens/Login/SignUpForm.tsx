import React from "react";
import {View, StyleSheet, Text, TextInput} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";


interface signUpFormProps {
    title: string,
    onChangeListener: Function,
    defalutValue : string,
}
const styles = StyleSheet.create({
	inputSection: {
		flexDirection: "row",
		height: "6%",
		marginTop: "12%",
		alignItems: "center",
	},
	inputTitle: {
		marginTop: "auto",
		marginBottom: "auto",
		marginLeft: "11%",
		marginRight: "8%",
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(14),
		letterSpacing: 0,
		textAlign: "left",
		justifyContent: "center",

	},
	inputField: {
		width: "62%",
		height: "125%",
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
