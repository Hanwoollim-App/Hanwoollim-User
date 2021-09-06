import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type CustomBtnPropType = {
	title: string;
	onClickListener: Function;
	titleStyle: Object;
	btnStyle: Object;
};

export function CustomBtn({
	title,
	onClickListener,
	titleStyle,
	btnStyle,
}: CustomBtnPropType) {
	return (
		<TouchableOpacity onPress={() => onClickListener()} style={btnStyle}>
			<Text style={titleStyle}>{title}</Text>
		</TouchableOpacity>
	);
}
