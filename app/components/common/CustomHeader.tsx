import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import color from '../../utils/constant/common/design/Color';
import { fontPercentage } from '../../utils/constant/common/design/Responsive';

interface customHeader {
	title?: string;
}

const styles = StyleSheet.create({
	root: {
		height: '100%',
		width: '100%',
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
		width: '55%',
		height: '80%',
		resizeMode: 'cover',
	},
});

const logo = require('../../assets/images/textLogo_light.png');

function CustomHeader({ title }: customHeader) {
	return (
		<View style={styles.root}>
			{title ? (
				<Text style={styles.title}>{title}</Text>
			) : (
				<Image source={logo} style={styles.logoImg} />
			)}
		</View>
	);
}

export default CustomHeader;
