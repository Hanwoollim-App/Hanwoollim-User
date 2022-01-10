import * as yup from 'yup';
import { ISignInFormData } from './sign-in.type';

export const defaultValues: ISignInFormData = {
	id: null,
	pw: null,
};

export const SIGN_IN_SCHEMA: yup.SchemaOf<ISignInFormData> = yup
	.object()
	.shape({
		id: yup.string().required(),
		pw: yup.string().required().min(4),
	});
