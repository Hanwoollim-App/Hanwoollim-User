import * as yup from 'yup';
import { ISignUpFormData } from './sign-up.type';

export const defaultValues: ISignUpFormData = {
	id: null,
	pw: null,
};

export const SIGN_UP_SCHEMA: yup.SchemaOf<ISignUpFormData> = yup
	.object()
	.shape({
		id: yup.string().required(),
		pw: yup.string().required(),
	});