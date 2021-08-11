import React, { useState } from 'react';
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import color from '../../../utils/constant/common/design/Color';
import { SIGN_UP_COMPONENT_TEXT } from '../../../utils/constant/login/singUpScreen';
import CustomBtn from '../../common/CustomBtn';
import InfoEditForm from './Form';

import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
} from '../../../utils/constant/common/design/Responsive';
import ScreenWrapper from '../../common/ScreenWrapper';

const styles = StyleSheet.create({
	barStyle: {
		backgroundColor: color.mainColor,
	},
	root: {
		flex: 1,
	},
	header: {
		height: heightPercentage(141),
		justifyContent: 'center',
		backgroundColor: color.mainColor,
	},
	headerText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(32),
		lineHeight: fontPercentage(40),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#ffffff',
	},
	scrollView: {
		width: '100%',
	},
	scrollContent: {
		alignItems: 'center',
	},
	introText: {
		marginTop: heightPercentage(59),
		marginBottom: heightPercentage(34),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(15),
		lineHeight: fontPercentage(20),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#00203f',
	},
	middleEmpty: {
		height: heightPercentage(20),
	},
	input: {
		height: heightPercentage(33),
		marginTop: heightPercentage(53),
		flexDirection: 'row',
		alignItems: 'center',
	},
	alertText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(13),
		lineHeight: fontPercentage(18),
		marginTop: heightPercentage(160),
		letterSpacing: 0,
		fontWeight: 'normal',
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#777777',
	},
	signUp: {
		width: '77.3%',
		height: heightPercentage(53),
		marginTop: heightPercentage(32),
		borderRadius: fontPercentage(15),
		backgroundColor: color.mainColor,
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.16)',
				shadowOffset: {
					width: 0,
					height: heightPercentage(3),
				},
				shadowRadius: widthPercentage(6),
				shadowOpacity: widthPercentage(1),
			},
			android: {
				elevation: 1,
			},
		}),
		justifyContent: 'center',
		alignItems: 'center',
	},
	signUpTitle: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(20),
		lineHeight: fontPercentage(25),
		letterSpacing: 0,
		fontWeight: 'bold',
		fontStyle: 'normal',
		color: '#ffffff',
	},
	dropDown: {
		width: '90%',
		height: heightPercentage(46),
		marginBottom: heightPercentage(31),
		paddingVertical: 0,
		alignContent: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: widthPercentage(17),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownText: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: 16,
		fontWeight: 'bold',
	},
	dropDownContainer: {
		width: '90%',
		marginBottom: heightPercentage(31),
		marginLeft: widthPercentage(17),
		borderRadius: widthPercentage(10),
		backgroundColor: '#ffffff',
		borderColor: '#ffffff',
	},
	dropDownPlaceHolder: {
		color: '#a2a2a2',
	},
});

function infoEdit() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();
	const [name, setName]: [string, Function] = useState('');
	const [studentID, setStudentID]: [string, Function] = useState('');

	const infoEditBtnClickListener = () => {
		navigation.navigate('MyPage');
	};

	const [major, setMajor] = useState<string>('');
	const [open, setOpen] = useState<boolean>(false);
	const [items, setItems] = useState([
		{ label: '정보시스템학과', value: '정보시스템학과' },
		{ label: '기계공학부', value: '기계공학부' },
		{ label: '컴퓨터소프트웨어학부', value: '컴퓨터소프트웨어학부' },
		{ label: '융합전자공학부', value: '융합전자공학부' },
	]);

	return (
		<ScreenWrapper>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}>
				<Text style={styles.introText}>
					{'뭔가가 바뀌었나요?\n바뀐 내용을 적어주세요!!'}
				</Text>
				<View style={styles.middleEmpty} />
				<InfoEditForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.name}
					inputChangeListener={(value: string) => setName(value)}
					defaultValue={name}
				/>
				<DropDownPicker
					open={open}
					value={major}
					items={items}
					setOpen={setOpen}
					setValue={setMajor}
					setItems={setItems}
					style={styles.dropDown}
					textStyle={styles.dropDownText}
					dropDownContainerStyle={styles.dropDownContainer}
					placeholderStyle={styles.dropDownPlaceHolder}
					placeholder="전공"
				/>
				<InfoEditForm
					placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.studentID}
					inputChangeListener={(value: string) => setStudentID(value)}
					defaultValue={studentID}
				/>
				<Text style={styles.alertText}>{SIGN_UP_COMPONENT_TEXT.alert}</Text>

				<CustomBtn
					title={'정보 수정하기'}
					onClickListener={infoEditBtnClickListener}
					btnStyle={styles.signUp}
					titleStyle={styles.signUpTitle}
				/>
			</ScrollView>
		</ScreenWrapper>
	);
}

export default infoEdit;
