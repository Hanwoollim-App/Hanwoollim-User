import React from "react";
import {View, Text, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface pickerPropsInterface {
	placeholder: Object,
	pickerStyle: Object,
	items: Array<any>,
	value: any,
	onValueChange: Function,
}

interface selectFormPropsInterface{
	title : string,
	pickerProps: pickerPropsInterface,
}

const styles = StyleSheet.create({
	rootView: {
		flexDirection: "row",
		marginTop: 32,
	},
	title: {
		marginLeft: 40,
		fontFamily: "KoreanYNSJG4",
		fontSize: 13,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 18,
		letterSpacing: 0,
		textAlign: "left",
		color: "#363636",
	},
	pickerView: {
		width: 113,
		height: 26,
		marginLeft: 96,
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#00203f",
	},
});

function SelectForm({title, pickerProps} : selectFormPropsInterface) {
	return (
		<View style={styles.rootView}>
			<Text style={styles.title}>
				{`${title}`}
			</Text>
			<View style={styles.pickerView}>
				<RNPickerSelect
					placeholder={pickerProps.placeholder}
					style={pickerProps.pickerStyle}
					items={pickerProps.items}
					value={pickerProps.value}
					onValueChange={(value) => {
						pickerProps.onValueChange(value);
					}}
				/>
			</View>
		</View>
	);
}

export default SelectForm;
