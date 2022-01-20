import * as yup from 'yup';
import { IMyPageInfoEditData } from './my-page-info-edit.type';

export const defaultValues: IMyPageInfoEditData = {
	changedName: null,
	changedMajor: null,
	changedStudentID: null,
};

export const MY_PAGE_INFO_EDIT_SCHEMA: yup.SchemaOf<IMyPageInfoEditData> = yup
	.object()
	.shape({
		changedName: yup.string().required(),
		changedMajor: yup.string().required(),
		changedStudentID: yup.string().required().min(10).max(10),
	});
