import React from 'react';
import {
	StatusBar as RNStatusBar,
	StyleSheet,
	Platform,
	View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { color } from '../../../utils';

const STATUSBAR_HEIGHT =
	Platform.OS === 'ios' ? getStatusBarHeight() : RNStatusBar.currentHeight;

const styles = StyleSheet.create({
	statusBar: {
		height: STATUSBAR_HEIGHT,
		backgroundColor: color.mainColor,
	},
});

export function StatusBar() {
	return (
		<View style={styles.statusBar}>
			<RNStatusBar
				translucent
				backgroundColor={color.mainColor}
				barStyle="light-content"
			/>
		</View>
	);
}
