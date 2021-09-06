import { useFocusEffect } from '@react-navigation/native';
import React, {
	ReactNode,
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from 'react';
import { LoadingModal } from '../../components/layout';

export type LoadingModalContextType = {
	setDependencyArray: Function;
};

export type LoadingModalProviderProps = {
	children: ReactNode;
};

const LoadingModalContext = createContext<LoadingModalContextType | null>(null);

export const LoadingModalProvider = ({
	children,
}: LoadingModalProviderProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [dependencyArray, setDependencyArray] = useState<Array<boolean>>([
		false,
	]);

	useEffect(() => {
		const isTrue = (value: boolean) => value;
		const isOneOfDependencyTrue = dependencyArray.some(isTrue);

		setIsLoading(isOneOfDependencyTrue);
	}, [dependencyArray]);

	return (
		<LoadingModalContext.Provider value={{ setDependencyArray }}>
			<LoadingModal isVisible={isLoading} />
			{children}
		</LoadingModalContext.Provider>
	);
};

const useLoadingModalContext = () => {
	const context = useContext(LoadingModalContext);

	if (!context) {
		throw new Error(
			'useLoadingModal must be used within a LoadingModalProvider',
		);
	}
	return context;
};

export const useLoadingModal = (dependencyArray: Array<boolean>) => {
	const { setDependencyArray } = useLoadingModalContext();

	useFocusEffect(
		useCallback(() => {
			setDependencyArray(dependencyArray);
			return () => setDependencyArray([false]);
		}, [JSON.stringify(dependencyArray)]),
	);
};
