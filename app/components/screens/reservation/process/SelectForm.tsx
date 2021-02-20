import React from "react";
import {View, Text, StyleSheet} from "react-native";
import RNPickerSelect, {Item} from "react-native-picker-select";
import {responsiveHeight, responsiveWidth} from "react-native-responsive-dimensions";
import {RFPercentage} from "react-native-responsive-fontsize";
import {fontPercentage, heightPercentage, widthPercentage} from "./../../../../utils/constant/common/design/Responsive";

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
		width: responsiveWidth(widthPercentage(53)),
		marginLeft: responsiveWidth(widthPercentage(40)),
	},
	form__title__text: {
		fontFamily: "KoreanYNSJG4",
		fontSize: RFPercentage(fontPercentage(13)),
		fontWeight: "normal",
		fontStyle: "normal",
		lineHeight: RFPercentage(fontPercentage(18)),
		letterSpacing: 0,
		color: "#363636",
		textAlign: "left",
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
			<View style={styles.form__title}>
				<Text style={styles.form__title__text}>
					{`${title}`}
				</Text>
			</View>
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
