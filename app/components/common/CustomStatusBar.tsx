import React from 'react';
import { StatusBar, StyleSheet, Platform, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import color from '../../utils/constant/common/design/Color';

const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;

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
