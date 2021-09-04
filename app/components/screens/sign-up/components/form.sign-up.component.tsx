import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../../utils/api/responsive/responsive.api';

interface signUpFormProps {
	placeholder: string;
	inputChangeListener: Function;
	defaultValue: string;
	isSecureInput?: boolean;
}
const styles = StyleSheet.create({
	input: {
		width: '90%',
		height: heightPercentage(46),
		marginBottom: heightPercentage(31),
		paddingVertical: 0,
		paddingLeft: widthPercentage(12),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(16),
		lineHeight: fontPercentage(20),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'left',
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
	},
});

export function SignUpForm({
	placeholder,
	inputChangeListener,
	defaultValue,
	isSecureInput = false,
}: signUpFormProps) {
	return (
		<TextInput
			style={styles.input}
			onChangeText={(newValue: string) => inputChangeListener(newValue)}
			value={defaultValue}
			placeholder={placeholder}
			placeholderTextColor="#a2a2a2"
			secureTextEntry={isSecureInput}
		/>
	);
}
