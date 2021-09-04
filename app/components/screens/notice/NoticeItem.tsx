import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/responsive/responsive.api';

import NoticeDetailItemInterface from '../../../utils/types/noticeDetailItem';

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	item: {
		width: widthPercentage(307),
		height: heightPercentage(50),
		marginTop: heightPercentage(5),
		marginHorizontal: widthPercentage(14),
	},
	title: {
		height: heightPercentage(24),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(16),
		textAlign: 'left',
		color: '#000000',
	},
	date: {
		height: heightPercentage(17),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(12),
		textAlign: 'left',
		color: '#808080',
	},
});

function NoticeItem({
	title,
	date,
	id,
	body,
	writer,
}: NoticeDetailItemInterface) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const NoticeClickListener = () => {
		navigation.navigate('NoticeNavigator', {
			screen: 'NoticeDetail',
			params: { title, date, id, body, writer },
		});
	};

	return (
		<TouchableOpacity onPress={NoticeClickListener}>
			<View style={styles.item}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.date}>{date}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default React.memo(NoticeItem);
