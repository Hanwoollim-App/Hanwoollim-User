import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faBolt, faClipboardList, faHome, faPlusCircle, IconDefinition} from "@fortawesome/free-solid-svg-icons";

export const bottomTabIconOption = ({route}) => ({
	tabBarIcon: () => {
		let iconName: IconDefinition;

		switch (route.name) {
			case "Home":
				iconName = faHome;
				break;
			case "FlashMob":
				iconName = faBolt;
				break;
			case "Reservation":
				iconName = faPlusCircle;
				break;
			case "Board":
				iconName = faClipboardList;
				break;
			default:
				iconName = faHome;
				break;
		}
	},
});
