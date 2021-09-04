import React from 'react';
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
import HeaderInterface from '../custom-header/custom-header.layout';
import CustomStatusBar from '../custom-status-bar/custom-status-bar.layout';

interface screenWrapper {
	children: React.ReactNode;
	headerTitle?: string;
}
const icon = (
	<FontAwesomeIcon style={{ color: 'white' }} icon={faChevronLeft} />
);

function ScreenWrapper({ children, headerTitle }: screenWrapper) {
	const navigation: NavigationProp<ParamListBase> = useNavigation();

	return (
		<>
			<CustomStatusBar />
			<SafeAreaView style={defaultStyle.root} edges={['bottom']}>
				<View style={defaultStyle.header}>
					<HeaderInterface
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

export default ScreenWrapper;
