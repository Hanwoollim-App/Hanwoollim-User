import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import RNModal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
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
		marginTop: heightPercentage(10),
		fontFamily: 'NotoSansKR-Regular',
		fontSize: fontPercentage(13),
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

type ICustomModalProp = {
	isLoading?: boolean;
	mdVisible: boolean;
	title: string;
	subtitle?: string;
	buttonList: Array<customBtnType>;
};

export function Modal({
	isLoading = false,
	mdVisible,
	title,
	subtitle = '',
	buttonList,
}: ICustomModalProp) {
	const [last, second, ...first]: Array<customBtnType | undefined> = [
		...buttonList,
	].reverse();

	const renderContent = () => (
		<>
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
		</>
	);

	return (
		<RNModal
			useNativeDriver
			animationIn="fadeIn"
			animationOut="fadeOut"
			isVisible={isLoading || mdVisible}
			statusBarTranslucent>
			<View style={styles.modalView}>
				{isLoading && (
					<ActivityIndicator
						color={color.mainColor}
						size="large"
						animating={true}
					/>
				)}
				{!isLoading && renderContent()}
			</View>
		</RNModal>
	);
}
