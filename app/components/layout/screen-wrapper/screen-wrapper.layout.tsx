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
import { Header } from '../header';
import { StatusBar } from '../status-bar';

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

	const handleGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
	};

	return (
		<>
			<StatusBar />
			<SafeAreaView style={defaultStyle.root} edges={['bottom']}>
				<View style={defaultStyle.header}>
					<Header
						title={headerTitle ?? undefined}
						headerLeft
						leftIcon={icon}
						leftIconClickListener={handleGoBack}
					/>
				</View>
				<View style={defaultStyle.contents}>{children}</View>
			</SafeAreaView>
		</>
	);
}
