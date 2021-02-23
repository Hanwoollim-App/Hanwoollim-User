import React from "react";
import {StyleSheet, Text, TextInput} from "react-native";
import {fontPercentage, heightPercentage, widthPercentage} from "../../../utils/constant/common/design/Responsive";

interface signUpFormProps {
    title: string,
    inputChangeListener: Function,
    defalutValue : string,
}
const styles = StyleSheet.create({
	input__title: {
		marginTop: "auto",
		marginBottom: "auto",
		marginLeft: widthPercentage(42),
		marginRight: widthPercentage(31),
		fontFamily: "KoreanYNSJG3",
		fontSize: fontPercentage(14),
		letterSpacing: 0,
		textAlign: "left",
		justifyContent: "center",

	},
	input__field: {
		width: widthPercentage(233),
		height: heightPercentage(43),
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
