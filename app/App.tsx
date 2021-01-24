import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import ReservationNaviagator from "./components/navigator/ReservationNaviagator";

function App() {
	return (
		<NavigationContainer>
			<ReservationNaviagator/>
		</NavigationContainer>
	);
}


export default App;
