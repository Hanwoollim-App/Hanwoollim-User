import React, { useState } from 'react';
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	ScrollView,
	Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../../utils/api/responsive/responsive.api';
import ScreenWrapper from '../../../layout/screen-wrapper/screen-wrapper.layout.tsx';
import { ItemType, ValueType } from '../../../../utils/types/dropDown';
import TimeTable from './components/time-table.reservation-time-table.component';
import weekItem from '../../../../utils/constant/reservation/timeTable/reservationTimeTable';

const styles = StyleSheet.create({
	titleBlock: {
		width: '95%',
		alignItems: 'center',
		height: heightPercentage(66),
	},
	row: {
		width: '95%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: heightPercentage(66),
		...Platform.select({
			ios: {
				zIndex: 1000,
			},
			android: {},
		}),
	},
	picker: {
		width: widthPercentage(162),
		height: heightPercentage(36),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		justifyContent: 'center',
		alignItems: 'center',
	},
	reserveBtn: {
		width: widthPercentage(146),
		height: heightPercentage(36),
		borderRadius: widthPercentage(15),
		borderWidth: widthPercentage(1),
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		borderColor: '#00203f',
		alignItems: 'center',
		justifyContent: 'center',
	},
	reserveBtnText: {
		height: heightPercentage(20),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(14),
		fontWeight: 'bold',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'center',
		color: '#00203f',
	},
	dropDown: {
		width: widthPercentage(162),
		height: heightPercentage(36),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownText: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: 16,
		fontWeight: 'bold',
	},
	dropDownContainer: {
		borderRadius: widthPercentage(10),
		minHeight: heightPercentage(50),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	placeholder: { color: 'grey' },
});

export function ReservationTimeTable() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<ValueType>(null);
	const [date, setDate] = useState<Array<ItemType>>(weekItem);
	const reserveBtnListener = () => {
		const index = weekItem.findIndex((i) => i.value === value);
		const weekName = weekItem[index].label;

		navigation.navigate('ReservationProcess', { weekName });
	};

	return (
		<ScreenWrapper headerTitle="예약하기">
			<View style={styles.row}>
				<View>
					<DropDownPicker
						open={open}
						value={value}
						items={date}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setDate}
						style={styles.dropDown}
						textStyle={styles.dropDownText}
						dropDownContainerStyle={styles.dropDownContainer}
						placeholderStyle={styles.placeholder}
					/>
				</View>
				<TouchableOpacity
					style={styles.reserveBtn}
					onPress={reserveBtnListener}>
					<Text style={styles.reserveBtnText}>예약하기</Text>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<TimeTable />
			</ScrollView>
		</ScreenWrapper>
	);
}
