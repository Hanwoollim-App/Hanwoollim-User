import React, {useEffect} from "react";
import {View} from "react-native";
import ReservationProcessHeader from "./ReservationProcessHeader";


function ReservingProcess({route}) {
	const {currentWeek} : any = route.params; // ts 형식으로 바꿀 필요 있음

	useEffect(() => {
		console.log(currentWeek);
	}, [currentWeek]);

	return (
		<View>
			<ReservationProcessHeader
				currentWeek={currentWeek}
			/>
		</View>
	);
}

export default ReservingProcess;
