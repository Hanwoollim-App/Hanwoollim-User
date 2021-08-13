export const TOKEN_EMPTY: string = 'token has not fetched';
export const PROFILE_EMPTY: { [key: string]: string } = {
	id: 'profile has not fetched',
	email: 'profile has not fetched',
	profile_image_url: '',
};
export interface loginInterface {
	token: Array<string | Function | any>;
	profile: Array<string | Function | any>;
}
