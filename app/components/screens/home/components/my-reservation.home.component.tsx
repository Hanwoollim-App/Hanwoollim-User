import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
} from '../../../../utils/api/responsive/responsive.api';
import trimmingText from '../../../../utils/api/trimming-text/trimming-text.api';
import blockStyles from '../../../../utils/constant/home/home-block-style.constant';

const tempMyReservation: Array<string> = [];

const styles = StyleSheet.create({
	root: {
		height: heightPercentage(88),
	},
	contents: {
		flex: 2,
	},
	reservation: {
		flex: 1,
		width: '100%',
	},
	reservationText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		lineHeight: fontPercentage(23),
		fontWeight: 'normal',
		fontStyle: 'normal',
		letterSpacing: 0,
		textAlign: 'left',
		color: '#494949',
	},
	noReservation: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		lineHeight: fontPercentage(16),
		letterSpacing: 0,
		fontWeight: 'normal',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#494949',
	},
});

export function MyReservation() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const isEmpty: boolean = tempMyReservation.length === 0;

	const titleBtnListener: () => void = () => {
		navigation.navigate('ReservingTimeTable');
	};

	return (
		<View style={[blockStyles.root, styles.root]}>
			<View style={blockStyles.title}>
				<Text style={blockStyles.titleText}>나의 연습실 예약 현황</Text>
				<TouchableOpacity
					onPress={titleBtnListener}
					style={blockStyles.titleBtn}>
					<FontAwesomeIcon
						size={fontPercentage(20)}
						style={{
							color: '#000000',
						}}
						icon={faChevronRight}
					/>
				</TouchableOpacity>
			</View>
			<View style={[blockStyles.contents, styles.contents]}>
				{(isEmpty && (
					<Text style={styles.noReservation}>오늘 예약된 시간이 없습니다.</Text>
				)) ||
					tempMyReservation.map((value) => (
						<View style={styles.reservation} key={value}>
							<Text style={styles.reservationText}>
								{trimmingText(value, 35)}
							</Text>
						</View>
					))}
			</View>
		</View>
	);
}
