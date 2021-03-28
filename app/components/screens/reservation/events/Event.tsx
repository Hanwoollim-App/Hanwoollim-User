import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {heightPercentage, fontPercentage, widthPercentage} from "../../../../utils/constant/common/design/Responsive";

const styles = StyleSheet.create({
	item: {
		height: heightPercentage(59),
		width: widthPercentage(44),
		position: "absolute",
		paddingVertical: 2,
		paddingHorizontal: 2,
		borderRadius: 7,
	},
	title: {
		color: "white",
		textAlign: "left",
		fontSize: fontPercentage(13),
	},
});

interface EventProps {
    style : Object,
    title : string,
    color : string,
}

function Event({style, title, color} : EventProps) {
	return (
		<View // 터치는 나중에 구현
			style={[
				styles.item, style, {
					backgroundColor: color,
				},
			]}
		>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

export default React.memo(Event);
