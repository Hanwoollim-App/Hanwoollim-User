import * as yup from 'yup';
import { ISignUpFormData } from './sign-up.type';

export const defaultValues: ISignUpFormData = {
	id: null,
	pw: null,
	pwCheck: null,
	name: null,
	studentID: null,
	major: null,
};

export const SIGN_UP_SCHEMA: yup.SchemaOf<ISignUpFormData> = yup
	.object()
	.shape({
		id: yup.string().required(),
		pw: yup.string().required(),
		pwCheck: yup.string().required(),
		name: yup.string().required(),
		studentID: yup.string().required(),
		major: yup.string().required(),
	});
