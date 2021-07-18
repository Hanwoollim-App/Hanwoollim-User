import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import color from '../../utils/constant/common/design/Color';

const styles = StyleSheet.create({
	root: {
		height: '100%',
		width: '100%',
		backgroundColor: color.mainColor,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logoImg: {
		width: '55%',
		height: '80%',
		resizeMode: 'cover',
	},
});

const logo = require('../../assets/images/textLogo_light.png');

function CustomHeader() {
	// const navigation: NavigationProp<ParamListBase> = useNavigation();

	return (
		<View style={styles.root}>
			<Image source={logo} style={styles.logoImg} />
		</View>
	);
}

export default CustomHeader;
