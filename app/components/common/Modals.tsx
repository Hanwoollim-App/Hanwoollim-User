import React from "react";
import {Text, View, Modal} from "react-native";

interface ModalsProps {
    mdVisible: boolean,
    modalStyle: Object,
    titleStyle: Object,
    title: string,
    ModalButton: Function,
}

function Modals({mdVisible, modalStyle, titleStyle, title, ModalButton} : ModalsProps) {
	return (
		<Modal
			animationType="slide"
			visible={mdVisible}
		>
			<View style={modalStyle}>
				<Text style={titleStyle}>
					{title}
				</Text>
				{ModalButton}
			</View>
		</Modal>
	);
}

export default React.memo(Modals);
