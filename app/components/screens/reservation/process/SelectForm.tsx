import React from "react";
import {View, Text, StyleSheet} from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface pickerPropsInterface {
	placeholder: Object,
	style: Object,
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
		width: 53,
		height: "50%",
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
		height: "100%",
		marginLeft: 96,
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
					style={pickerProps.style}
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
