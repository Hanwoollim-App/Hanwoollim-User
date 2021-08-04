export type customBtnType = {
	buttonText: string;
	buttonClickListener: Function;
};
export interface ModalsProps {
	mdVisible: boolean;
	title: string;
	subtitle?: string;
	buttonList: Array<customBtnType>;
}
