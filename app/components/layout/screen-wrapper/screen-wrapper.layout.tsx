import React, { ReactNode } from 'react';
import { View } from 'react-native';
import {
	NavigationProp,
	ParamListBase,
	useNavigation,
} from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import defaultStyle from '../../../utils/data/default-style/default-style.data';
import { CustomHeader } from '../custom-header';
import { CustomStatusBar } from '../custom-status-bar';

type screenWrapperPropType = {
	children: ReactNode;
	headerTitle?: string;
};

const icon = (
	<FontAwesomeIcon style={{ color: 'white' }} icon={faChevronLeft} />
);

export function ScreenWrapper({
	children,
	headerTitle,
}: screenWrapperPropType) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={defaultStyle.root} edges={['bottom']}>
				<View style={defaultStyle.header}>
					<CustomHeader
						title={headerTitle ?? undefined}
						headerLeft
						leftIcon={icon}
						leftIconClickListener={navigation.goBack}
					/>
				</View>
				<View style={defaultStyle.contents}>{children}</View>
			</SafeAreaView>
		</>
	);
}
