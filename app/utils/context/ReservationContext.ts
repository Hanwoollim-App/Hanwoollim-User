import { createContext } from 'react';

export class ReservationInfo {
	info: Array<any>;

	constructor() {
		this.info = [];
	}
}

const ReservationContext = createContext<ReservationInfo | undefined>(null);

export default ReservationContext;
