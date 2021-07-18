import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { memo } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { fontPercentage } from '../../../utils/constant/common/design/Responsive';
import trimmingText from '../../../utils/constant/common/trimmingText';
import blockStyles from '../../../utils/constant/home/blockStyles';

const tempReservation: Array<string> = [
	'03:00-04:00 안재훈 팀 합주',
	'13:00-14:00 한인권 개인 연습 (드럼) , 이원기 개인 연습(보컬), 조성현 개인 연습(기타)',
	'15:00-16:00 이호직 개인 연습 (보컬)',
];

const styles = StyleSheet.create({
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
});

function TodayReservation() {
	return (
		<View style={blockStyles.root}>
			<View style={blockStyles.title}>
				<Text style={blockStyles.titleText}>오늘의 연습실 예약 현황</Text>
				<TouchableOpacity style={blockStyles.titleBtn}>
					<FontAwesomeIcon
						size={fontPercentage(20)}
						style={{
							color: '#000000',
						}}
						icon={faChevronRight}
					/>
				</TouchableOpacity>
			</View>
			<View style={blockStyles.contents}>
				{tempReservation.map((value) => (
					<View style={styles.reservation} key={value}>
						<Text style={styles.reservationText}>
							{trimmingText(value, 35)}
						</Text>
					</View>
				))}
				<Text style={styles.reservationText}>외 3개의 예약이 있습니다.</Text>
			</View>
		</View>
	);
}

export default memo(TodayReservation);
