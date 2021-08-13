import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from './../../../../utils/constant/common/design/Responsive';

interface pickerPropsInterface {
	placeholder: Object;
	items: Array<Item>;
	pickerSelectStyles: Object;
	ref: React.Ref<any>;
}

interface selectFormPropsInterface {
	title: string;
	pickerProps: pickerPropsInterface;
}

const styles = StyleSheet.create({
	form__title: {
		width: widthPercentage(53),
		marginLeft: widthPercentage(40),
	},
	form__title__text: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(13),
		fontWeight: 'normal',
		fontStyle: 'normal',
		letterSpacing: 0,
		color: '#363636',
		textAlign: 'left',
	},
	form__picker: {
		width: widthPercentage(113),
		height: heightPercentage(26),
		marginLeft: widthPercentage(96),
		borderStyle: 'solid',
		borderWidth: fontPercentage(1),
		borderColor: '#00203f',
	},
});

function SelectForm({ title, pickerProps }: selectFormPropsInterface) {
	return (
		<>
			<View style={styles.form__title}>
				<Text style={styles.form__title__text}>{`${title}`}</Text>
			</View>
			<View style={styles.form__picker}>
				<RNPickerSelect
					ref={pickerProps.ref}
					placeholder={pickerProps.placeholder}
					useNativeAndroidPickerStyle={false}
					style={pickerProps.pickerSelectStyles}
					items={pickerProps.items}
					onValueChange={(value) => {
						console.log(value);
					}}
				/>
			</View>
		</>
	);
}

export default React.memo(SelectForm);
