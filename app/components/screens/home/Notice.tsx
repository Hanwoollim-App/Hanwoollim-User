import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import React, { memo } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { fontPercentage } from '../../../utils/constant/common/design/Responsive';
import trimmingText from '../../../utils/constant/common/trimmingText';
import blockStyles from '../../../utils/constant/home/blockStyles';

const tempNoticeContents: Array<string> = [
	'새로운 회장단으로 기계공학부 18학번 이호직, 장준하 당선',
	'한울림 신입 부원 상시 모집 중!',
	'한울림 전용 예약 어플이 개발 중입니다.',
];

const styles = StyleSheet.create({
	notice: {
		flex: 1,
		width: '100%',
	},
	noticeText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		lineHeight: fontPercentage(23),
		letterSpacing: 0,
		fontWeight: '300',
		fontStyle: 'normal',
		textAlign: 'left',
		color: '#494949',
	},
});

function Notice() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const titleBtnListener = () => {
		navigation.navigate('NoticeScreen');
	};

	return (
		<TouchableOpacity style={blockStyles.root} onPress={titleBtnListener}>
			<View style={blockStyles.title}>
				<Text style={blockStyles.titleText}>한울림 공지사항</Text>
				<View style={blockStyles.titleBtn}>
					<FontAwesomeIcon
						size={fontPercentage(20)}
						style={{
							color: '#000000',
						}}
						icon={faChevronRight}
					/>
				</View>
			</View>
			<View style={blockStyles.contents}>
				{tempNoticeContents.map((notice) => (
					<View style={styles.notice} key={notice}>
						<Text style={styles.noticeText}>{trimmingText(notice, 35)}</Text>
					</View>
				))}
			</View>
		</TouchableOpacity>
	);
}

export default memo(Notice);
