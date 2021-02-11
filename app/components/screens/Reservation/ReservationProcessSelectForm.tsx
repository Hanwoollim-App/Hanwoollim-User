import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const styles= StyleSheet.create({

})

function ReservationProcessSelectForm({title, pickerProps}) {
    return (
        <View style={styles.reservationUnit}>
					<Text>{`예약 단위`}</Text>
					<View>
						<RNPickerSelect
							placeholder={{}}
							style={pickerStyle}
							items={dayItems}
							value={dayItems[0]}
							onValueChange={() => console.log(dayItems)}
						/>
					</View>
        </View>
    );
}

export default ReservationProcessSelectForm;