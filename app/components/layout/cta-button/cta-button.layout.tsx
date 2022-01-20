import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type ICTAButtonPropType = {
	title: string;
	onClickListener: Function;
	titleStyle: Object;
	btnStyle: Object;
	disabled?: boolean;
};

export function CTAButton({
	title,
	onClickListener,
	titleStyle,
	btnStyle,
	disabled = false,
}: ICTAButtonPropType) {
	return (
		<TouchableOpacity
			onPress={() => onClickListener()}
			style={[btnStyle, disabled && { opacity: 0.6 }]}
			disabled={disabled}>
			<Text style={titleStyle}>{title}</Text>
		</TouchableOpacity>
	);
}
