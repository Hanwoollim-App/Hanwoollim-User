import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
	useFocusEffect,
} from '@react-navigation/native';
import React, { memo, useCallback, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { fontPercentage } from '../../../utils/constant/common/design/Responsive';
import trimmingText from '../../../utils/constant/common/trimmingText';
import blockStyles from '../../../utils/constant/home/blockStyles';
import NoticeDetailItemInterface from '../../../utils/types/noticeDetailItem';
import { getNotice } from '../../../utils/constant/api';

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
	const [noticeData, setNoticeData] = useState<
		Array<NoticeDetailItemInterface>
	>([]);

	useFocusEffect(
		useCallback(() => {
			getNotice(setNoticeData);
		}, []),
	);
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
				{noticeData.map((notice) => (
					<View style={styles.notice} key={notice.id}>
						<Text style={styles.noticeText}>
							{trimmingText(notice.title, 35)}
						</Text>
					</View>
				))}
			</View>
		</TouchableOpacity>
	);
}

export default memo(Notice);
