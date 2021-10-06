import React from 'react';
import {
	Text,
	View,
	Modal as RNModal,
	StyleSheet,
	Platform,
} from 'react-native';
import { ICTAButton } from '..';
import {
	fontPercentage,
	heightPercentage,
	widthPercentage,
	color,
	customBtnType,
} from '../../../utils';

const styles = StyleSheet.create({
	modalView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	content: {
		width: widthPercentage(250),
		justifyContent: 'center',
		alignItems: 'center',
		borderTopLeftRadius: widthPercentage(15),
		borderTopRightRadius: widthPercentage(15),
		backgroundColor: 'white',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: widthPercentage(0.25),
				shadowRadius: widthPercentage(3.84),
				shadowOffset: {
					height: heightPercentage(2),
					width: 0,
				},
			},
			android: {
				elevation: 5,
			},
		}),
	},
	oneBtnContent: {
		width: widthPercentage(250),
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: widthPercentage(15),
		backgroundColor: 'white',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: widthPercentage(0.25),
				shadowRadius: widthPercentage(3.84),
				shadowOffset: {
					height: heightPercentage(2),
					width: 0,
				},
			},
			android: {
				elevation: 5,
			},
		}),
	},
	title: {
		marginTop: heightPercentage(25),
		fontFamily: 'NotoSansKR-Bold',
		fontSize: fontPercentage(15),
		letterSpacing: 1,
		fontStyle: 'normal',
		textAlign: 'center',
		color: '#000000',
	},
	subtitle: {
		marginTop: heightPercentage(15),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(10),
		fontStyle: 'normal',
		textAlign: 'center',
		color: 'gray',
	},
	btnList: {
		width: widthPercentage(250),
		height: heightPercentage(44),
		marginTop: heightPercentage(0.5),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: widthPercentage(0.25),
				shadowRadius: widthPercentage(3.84),
				shadowOffset: {
					height: heightPercentage(2),
					width: 0,
				},
			},
			android: {
				elevation: 5,
			},
		}),
	},
	btnListTitle: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(15),
		textAlign: 'center',
		color: color.mainColor,
	},
	whiteLastBtn: {
		width: widthPercentage(250),
		height: heightPercentage(44),
		marginTop: heightPercentage(0.3),
		borderBottomLeftRadius: widthPercentage(15),
		borderBottomRightRadius: widthPercentage(15),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: widthPercentage(0.25),
				shadowRadius: widthPercentage(3.84),
				shadowOffset: {
					height: heightPercentage(2),
					width: 0,
				},
			},
			android: {
				elevation: 5,
			},
		}),
	},
	blueLastBtn: {
		width: widthPercentage(250),
		height: heightPercentage(44),
		marginTop: heightPercentage(10),
		borderRadius: widthPercentage(15),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: color.mainColor,
		...Platform.select({
			ios: {
				shadowColor: '#000',
				shadowOpacity: widthPercentage(0.25),
				shadowRadius: widthPercentage(3.84),
				shadowOffset: {
					height: heightPercentage(2),
					width: 0,
				},
			},
			android: {
				elevation: 5,
			},
		}),
	},
	blueLastBtnTitle: {
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(15),
		textAlign: 'center',
		color: 'white',
	},
});

type ICustomModalPropType = {
	mdVisible: boolean;
	title: string;
	subtitle?: string;
	buttonList: Array<customBtnType>;
};

export function Modal({
	mdVisible,
	title,
	subtitle = '',
	buttonList,
}: ICustomModalPropType) {
	const [last, second, ...first]: Array<customBtnType | undefined> = [
		...buttonList,
	].reverse();

	return (
		<RNModal animationType="fade" visible={mdVisible} transparent={true}>
			<View style={styles.modalView}>
				{second ? (
					<View style={styles.content}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.subtitle}>{subtitle}</Text>
					</View>
				) : (
					<View style={styles.oneBtnContent}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.subtitle}>{subtitle}</Text>
					</View>
				)}
				{first.map((result, i) => {
					return (
						result! && (
							<ICTAButton
								key={i}
								title={result.buttonText}
								onClickListener={result.buttonClickListener}
								titleStyle={styles.btnListTitle}
								btnStyle={styles.btnList}
							/>
						)
					);
				})}
				{second! && (
					<ICTAButton
						title={second.buttonText}
						onClickListener={second.buttonClickListener}
						titleStyle={styles.btnListTitle}
						btnStyle={styles.whiteLastBtn}
					/>
				)}
				{last! && (
					<ICTAButton
						title={last.buttonText}
						onClickListener={last.buttonClickListener}
						titleStyle={styles.blueLastBtnTitle}
						btnStyle={styles.blueLastBtn}
					/>
				)}
			</View>
		</RNModal>
	);
}
