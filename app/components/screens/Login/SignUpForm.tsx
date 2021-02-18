import React from "react";
import {StyleSheet, Text, TextInput, Dimensions} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface signUpFormProps {
    title: string,
    inputChangeListener: Function,
    defalutValue : string,
}
const styles = StyleSheet.create({
	input__title: {
		marginTop: "auto",
		marginBottom: "auto",
		marginLeft: windowWidth * 0.112,
		marginRight: windowWidth * 0.082,
		fontFamily: "KoreanYNSJG3",
		fontSize: RFValue(14),
		letterSpacing: 0,
		textAlign: "left",
		justifyContent: "center",

	},
	input__field: {
		width: windowWidth * 0.621,
		height: windowHeight * 0.053,
		borderColor: "#707070",
		borderWidth: 1,
	},
});

function SignUpForm({title, inputChangeListener, defalutValue} : signUpFormProps) {
	return (
		<>
			<Text style={styles.input__title}>{title}</Text>
			<TextInput
				style={styles.input__field}
				onChangeText={(newValue : string) => inputChangeListener(newValue)}
				value={defalutValue}
			/>
		</>
	);
}

export default React.memo(SignUpForm);
