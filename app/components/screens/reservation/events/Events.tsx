import React from "react";
import {View, StyleSheet} from "react-native";
import {heightPercentage, widthPercentage} from "../../../../utils/constant/common/design/Responsive";
import Event from "./Event";

const styles = StyleSheet.create({
	eventsTable: {
		position: "absolute",
		flexDirection: "row",
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
		backgroundColor: "transparent",
	},
});

interface EventsProps{
    events: Array,
}

function Events({events} : EventsProps) {
	// const [eventList, setEventList] : [Array, Function] = useState(events);
	// const sortByDate = () => {}; // 미구현
	// const checkDuplication = () => {}; // 미구현
	// const getStyleForEvent = (item) => {}; // 미구현
	const getPosition = (day, time) => {
		const leftPosition = widthPercentage(44) * day - 0.5;
		const TopPosition = heightPercentage(59) * time - 0.5;

		return {
			top: TopPosition,
			left: leftPosition,
		};
	};
	const colorGenerator = (num) => {
		const colorList = [
			// apple calendar color
			"rgba(246,206,218,1)",
			"rgba(250,227,209,1)",
			"rgba(248,238,207,1)",
			"rgba(224,245,214,1)",
			"rgba(215,235,252,1)",
			"rgba(235,217,244,1)",
			"rgba(228,223,217,1)",
			// prev
			"rgba(212,196,251,1)",
			"rgba(193,225,197,1)",
			"rgba(190,211,243,1)",
			"#81E1B8",
			"rgba(190,218,220,1)",
			"rgba(254,243,189,1)",
			"rgba(247,141,167,1)",
			"rgba(196,222,246,1)",
			"rgba(250,208,195,1)",
			"#cc9af4",
			"#f8b3eb",
			"#ff8080",
			"#9af49f",
			"#9aeff4",
			"#a8e6cf",
			"#fdffab",
			"rgba(0,208,132,0.9)",
			"rgba(217,227,240,0.9)",
			"rgba(105,108,137,0.8)",
			"rgba(142,209,252,0.9)",
			"rgba(6,147,227,0.8)",
			"rgba(153,0,239,0.9)",
			"rgba(235,20,76,0.9)",
			"rgba(83,0,235,1)", //
			"rgba(18,115,222,1)",
			"rgba(0,107,118,1)",
			"rgba(129,199,132,1)",
			"rgba(184,0,0,1)",
		];

		return colorList[num % colorList.length];
	};

	return (
		<View style={styles.eventsTable}>
			{events.map((day, dayindex) => (
				<View
					key={dayindex}
				>
					{day.map((item, itemindex) => (
						<Event
							key={itemindex}
							style={getPosition(dayindex, item.start)}
							title={item.title}
							color={colorGenerator(dayindex + itemindex)}
						/>
					))}
				</View>
			))}
		</View>
	);
}

export default React.memo(Events);
