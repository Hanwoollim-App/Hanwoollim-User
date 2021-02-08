import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBolt, faClipboardList, faHome, faPlusCircle, IconDefinition} from "@fortawesome/free-solid-svg-icons";

const bottomTabIconOption = (route) => {
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
	return <FontAwesomeIcon icon={iconName} size={20} color='#000000'/>;
};

export default bottomTabIconOption;
