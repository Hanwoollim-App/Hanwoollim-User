import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from '@react-navigation/native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { useAsyncCallback } from 'react-async-hook';
import { InfoEditForm } from './components';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
	color,
	majorItem,
	SIGN_UP_COMPONENT_TEXT,
	ICTAButton,
	useUserInfo,
	IUserInfoType,
	patchUserInfo,
	IModalValue,
} from '../../../../utils';
import { ScreenWrapper, CTAButton, Modal } from '../../../layout';
import {
	defaultValues,
	MY_PAGE_INFO_EDIT_SCHEMA,
} from './my-page-info-edit.data';
import { IMyPageInfoEditData } from './my-page-info-edit.type';

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
		alignItems: 'center',
	},
	scrollContent: {},
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

export function InfoEdit() {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	const { formState, control, handleSubmit } = useForm({
		mode: 'all',
		defaultValues,
		resolver: yupResolver(MY_PAGE_INFO_EDIT_SCHEMA),
	});
	const { isValid } = formState;

	const { setUser } = useUserInfo();
	const [modalValue, setModalValue] = useState({
		isVisible: false,
		text: '',
	});
	const errorModal = () => {
		setModalValue((prev) => ({
			...prev,
			isVisible: false,
		}));
	};
	const errModalBtn: Array<ICTAButton> = [
		{
			buttonText: '확인',
			buttonClickListener: errorModal,
		},
	];

	const openErrorModal = (errText: string) => {
		setModalValue((prev) => ({
			...prev,
			isVisible: true,
			text: errText,
		}));
	};

	const { execute: handleEditingInfo, loading: isEditingInfo } =
		useAsyncCallback(async (changedName, changedMajor, changedStudentID) => {
			try {
				await patchUserInfo(changedMajor, changedName, changedStudentID);

				setUser((prevUser: IUserInfoType) => {
					const { position, userName, major, studentId } = prevUser;

					return {
						userName,
						studentId,
						position,
						major,
					};
				});
				navigation.pop();
			} catch (err) {
				const errorMessage = err.response.data.message;

				if (err.response.status === 400) {
					if (
						errorMessage.startsWith('Failed! Student Id is already in use!')
					) {
						openErrorModal('학번이 중복됩니다');
						return;
					}
					if (errorMessage.startsWith('bad type of request')) {
						openErrorModal('잘못된 형식입니다');
					}
				}
			}
		});

	const handlePressEditingInfo = async (data: IMyPageInfoEditData) => {
		await handleEditingInfo(
			data.changedMajor,
			data.changedName,
			data.changedStudentID,
		);
	};

	// interface infoEditFormProps {
	// 	inputChangeListener: Function;
	// }
	const [open, setOpen] = useState<boolean>(false);
	const [items, setItems] = useState<Array<ItemType>>(majorItem);
	// const setValue = ({ inputChangeListener }: infoEditFormProps) => {
	// 	(newValue: string) => inputChangeListener(newValue);
	// };

	return (
		<ScreenWrapper>
			<Modal
				isLoading={isEditingInfo}
				mdVisible={modalValue.isVisible}
				title={modalValue.text}
				buttonList={errModalBtn}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
				}}
				accessible={false}>
				<View style={styles.scrollView}>
					<Text style={styles.introText}>
						{'뭔가가 바뀌었나요?\n바뀐 내용을 적어주세요!!'}
					</Text>
					<View style={styles.middleEmpty} />
					<Controller
						control={control}
						name="changedName"
						render={({ field: { onChange, value: CurrentChangedName } }) => {
							return (
								<InfoEditForm
									placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.name}
									inputChangeListener={onChange}
									defaultValue={CurrentChangedName}
								/>
							);
						}}
					/>
					<Controller
						control={control}
						name="changedMajor"
						render={({ field: { onChange, value: CurrentChangedMajor } }) => {
							return (
								<DropDownPicker
									open={open}
									value={CurrentChangedMajor}
									items={items}
									setOpen={setOpen}
									setValue={onChange}
									setItems={setItems}
									onChangeValue={onChange}
									style={styles.dropDown}
									textStyle={styles.dropDownText}
									dropDownContainerStyle={styles.dropDownContainer}
									placeholderStyle={styles.dropDownPlaceHolder}
									placeholder="전공"
								/>
							);
						}}
					/>
					<Controller
						control={control}
						name="changedStudentID"
						render={({
							field: { onChange, value: CurrentChangedStudentID },
						}) => {
							return (
								<InfoEditForm
									placeholder={SIGN_UP_COMPONENT_TEXT.inputTitle.studentID}
									inputChangeListener={onChange}
									defaultValue={CurrentChangedStudentID}
								/>
							);
						}}
					/>
					<Text style={styles.alertText}>{SIGN_UP_COMPONENT_TEXT.alert}</Text>

					<CTAButton
						title={'정보 수정하기'}
						onClickListener={handleSubmit(handlePressEditingInfo)}
						btnStyle={styles.signUp}
						titleStyle={styles.signUpTitle}
						disabled={!isValid}
					/>
				</View>
			</TouchableWithoutFeedback>
		</ScreenWrapper>
	);
}
