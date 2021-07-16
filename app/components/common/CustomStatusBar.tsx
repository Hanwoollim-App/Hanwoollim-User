import React from 'react';
import { StatusBar, StyleSheet, Platform, View } from 'react-native';
import color from '../../utils/constant/common/design/Color';
import { heightPercentage } from '../../utils/constant/common/design/Responsive';

const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? heightPercentage(47.5) : StatusBar.currentHeight;

const styles = StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT,
		backgroundColor: color.mainColor,
	},
});

function CustomStatusBar() {
	return (
		<View style={styles.statusBar}>
			<StatusBar
				translucent
				backgroundColor={color.mainColor}
				barStyle="light-content"
			/>
		</View>
	);
}

export default CustomStatusBar;
