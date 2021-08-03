import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
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
} from '../../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../../common/ScreenWrapper';

const styles = StyleSheet.create({
	titleBlock: {
		width: '95%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: heightPercentage(66),
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
});

function ReservationTimeTable() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const reserveBtnListener = () => {
		navigation.navigate('ReservationProcess');
	};
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: '6.28~7.4', value: '6.28~7.4' },
		{ label: '7.4~7.11', value: '7.4~7.11' },
		{ label: '7.11~7.18', value: '7.11~7.18' },
		{ label: '7.18~7.25', value: '7.18~7.25' },
	]);

	return (
		<ScreenWrapper headerTitle="예약하기">
			<View style={styles.titleBlock}>
				<View style={styles.picker}>
					<DropDownPicker
						open={open}
						value={value}
						items={items}
						setOpen={setOpen}
						setValue={setValue}
						setItems={setItems}
						style={{
							width: widthPercentage(162),
							height: heightPercentage(36),
							borderRadius: widthPercentage(10),
							backgroundColor: '#ffffff',
							borderColor: '#ffffff',
						}}
						textStyle={{
							fontFamily: 'NotoSansKR-Bold',
							fontSize: 16,
							fontWeight: 'bold',
						}}
						dropDownContainerStyle={{
							borderRadius: widthPercentage(10),
							backgroundColor: '#ffffff',
							borderColor: '#ffffff',
						}}
						placeholderStyle={{
							color: 'grey',
						}}
					/>
				</View>
				<TouchableOpacity
					style={styles.reserveBtn}
					onPress={reserveBtnListener}>
					<Text style={styles.reserveBtnText}>예약하기</Text>
				</TouchableOpacity>
			</View>
		</ScreenWrapper>
	);
}

export default ReservationTimeTable;
