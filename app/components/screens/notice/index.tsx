import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import NoticeItem from '../notice/NoticeItem';
import NoticeDetailItemInterface from '../../../utils/types/noticeDetailItem';
import ScreenWrapper from '../../common/ScreenWrapper';
import { api } from '../../../utils/constant/api';

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
	},
	list: {
		width: widthPercentage(335),
		height: heightPercentage(660),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		marginTop: heightPercentage(15),
	},
	itemSeparator: {
		marginLeft: widthPercentage(14),
		height: heightPercentage(1),
		width: widthPercentage(307),
		backgroundColor: '#c2c2c2',
	},
	btnStyle: {
		width: widthPercentage(290),
		height: heightPercentage(53),
		borderRadius: widthPercentage(21),
		backgroundColor: '#00203f',
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.16)',
				shadowOffset: {
					width: 0,
					height: heightPercentage(3),
				},
				shadowRadius: widthPercentage(6),
			},
			android: {
				elevation: 1,
			},
		}),
		marginTop: heightPercentage(18),
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTextStyle: {
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(20),
		justifyContent: 'center',
		textAlign: 'center',
		color: '#ffffff',
	},
});

const renderSeparator = () => {
	return <View style={styles.itemSeparator} />;
};

function NoticeScreen() {
	const [noticeData, setNoticeData] =
		useState<Array<NoticeDetailItemInterface>>();

	useEffect(() => {
		api.get('/manager/announcement').then((res) => {
			console.log(res.data);
			setNoticeData(res.data);
		});
	}, []);

	return (
		<ScreenWrapper headerTitle="공지사항">
			<View style={styles.list}>
				<FlatList
					data={noticeData}
					renderItem={({
						item: notice,
					}: {
						item: NoticeDetailItemInterface;
					}) => (
						<NoticeItem
							title={notice.title}
							date={notice.date}
							id={notice.id}
							writer={notice.writer}
							body={notice.body}
						/>
					)}
					keyExtractor={(item) => item.id}
					ItemSeparatorComponent={renderSeparator}
				/>
			</View>
		</ScreenWrapper>
	);
}

export default NoticeScreen;
