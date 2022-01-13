import * as yup from 'yup';
import { IReservationFormData } from './reservation-process.type';

export const defaultValues: IReservationFormData = {
	day: null,
	unit: null,
	time: null,
	session: null,
};

export const RESERVATION_SCHEMA: yup.SchemaOf<IReservationFormData> = yup
	.object()
	.shape({
		day: yup.string().required(),
		unit: yup.string().required(),
		time: yup.string().required(),
		session: yup.string().required(),
	});
