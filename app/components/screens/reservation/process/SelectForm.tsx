import React from "react";
import {View, Text, StyleSheet} from "react-native";
import RNPickerSelect, {Item} from "react-native-picker-select";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { heightPercentage, widthPercentage } from './../../../../utils/constant/common/design/Responsive';

interface pickerPropsInterface {
	placeholder: Object,
	items: Array<Item>,
	pickerSelectStyles: Object,
	value: any,
	onValueChange: Function,
}

interface selectFormPropsInterface{
	title : string,
	pickerProps: pickerPropsInterface,
}

const styles = StyleSheet.create({
	form__title: {
		marginLeft: responsiveWidth(widthPercentage(40)),
		fontFamily: "KoreanYNSJG4",
		fontSize: 13,
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: 18,
		letterSpacing: 0,
		textAlign: "left",
		color: "#363636",
	},
	form__picker: {
		width: responsiveWidth(widthPercentage(113)),
		height: responsiveHeight(heightPercentage(26)),
		marginLeft: responsiveWidth(widthPercentage(96)),
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#00203f",
	},
});

function SelectForm({title, pickerProps} : selectFormPropsInterface) {
	return (
		<>
			<Text style={styles.form__title}>
				{`${title}`}
			</Text>
			<View style={styles.form__picker}>
				<RNPickerSelect
					placeholder={pickerProps.placeholder}
					useNativeAndroidPickerStyle={false}
					style={pickerProps.pickerSelectStyles}
					items={pickerProps.items}
					value={pickerProps.value}
					onValueChange={(value) => {
						pickerProps.onValueChange(value);
					}}
				/>
			</View>
		</>
	);
}

export default React.memo(SelectForm);
