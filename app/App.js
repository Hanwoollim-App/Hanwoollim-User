import React from "react";
import {StyleSheet, View, Text} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
	sectionTitle: {
		fontSize: 24,
		fontWeight: 600,
		color: Colors.black,
	},
});

function App() {
	return (
		<View>
			<Text style={styles.sectionTitle}>HanWoollim 어플리케이션!</Text>
		</View>
	);
}


export default App;
