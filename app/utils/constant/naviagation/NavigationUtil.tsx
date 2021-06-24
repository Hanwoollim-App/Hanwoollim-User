import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
	faBolt,
	faClipboardList,
	faHome,
	faPlusCircle,
	IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import {fontPercentage} from "../common/design/Responsive";

const bottomTabIconOption = (route, color) => {
	let iconName: IconDefinition;

	switch (route.name) {
		case "Home":
			iconName = faHome;
			break;
		case "FlashMob":
			iconName = faBolt;
			break;
		case "ReservingTimeTable":
			iconName = faPlusCircle;
			break;
		case "Board":
			iconName = faClipboardList;
			break;
		default:
			iconName = faHome;
			break;
	}
	return (
		<FontAwesomeIcon icon={iconName} size={fontPercentage(30)} color={color} />
	);
};

export default bottomTabIconOption;
