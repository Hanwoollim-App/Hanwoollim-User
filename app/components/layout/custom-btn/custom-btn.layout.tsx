import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomBtnProps {
	title: string;
	onClickListener: Function;
	titleStyle: Object;
	btnStyle: Object;
}

export function CustomBtn({
	title,
	onClickListener,
	titleStyle,
	btnStyle,
}: CustomBtnProps) {
	return (
		<TouchableOpacity onPress={() => onClickListener()} style={btnStyle}>
			<Text style={titleStyle}>{title}</Text>
		</TouchableOpacity>
	);
}
