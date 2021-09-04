import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { textLightLogoImage } from '../../../assets';
import color from '../../../utils/data/color/color.data';
import {
	fontPercentage,
	heightPercentage,
} from '../../../utils/api/responsive/responsive.api';

const styles = StyleSheet.create({
	root: {
		height: '100%',
		width: '100%',
		flexDirection: 'row',
		backgroundColor: color.mainColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(20),
		lineHeight: fontPercentage(25),
		fontWeight: 'bold',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'left',
		color: '#ffffff',
	},
	logoImg: {
		width: '70%',
		height: '80%',
		resizeMode: 'cover',
	},
	header: {
		width: '100%',
		height: heightPercentage(57),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: color.mainColor,
	},
	headerText: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		color: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerCenter: {
		flex: 76,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerLeft: {
		flex: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerRight: {
		flex: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

interface HeaderInterface {
	title?: string;
	headerLeft?: boolean;
	headerRight?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	leftIconClickListener?: Function;
	rightIconClickListener?: Function;
}

function CustomHeader({
	title,
	headerLeft = false,
	headerRight = false,
	leftIcon,
	rightIcon,
	leftIconClickListener = () => {},
	rightIconClickListener = () => {},
}: HeaderInterface) {
	return (
		<View style={styles.root}>
			{headerLeft ? (
				<TouchableOpacity
					onPress={() => leftIconClickListener()}
					style={styles.headerLeft}>
					{leftIcon}
				</TouchableOpacity>
			) : (
				<View style={styles.headerLeft}></View>
			)}
			{title ? (
				<View style={styles.headerCenter}>
					<Text style={styles.title}>{title}</Text>
				</View>
			) : (
				<View style={styles.headerCenter}>
					<Image source={textLightLogoImage} style={styles.logoImg} />
				</View>
			)}
			{headerRight ? (
				<TouchableOpacity
					onPress={() => leftIconClickListener()}
					style={styles.headerRight}>
					{rightIcon}
				</TouchableOpacity>
			) : (
				<View style={styles.headerRight}></View>
			)}
		</View>
	);
}

export default CustomHeader;
