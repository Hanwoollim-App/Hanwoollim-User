export const trimmingText = (
	text: string,
	LIMIT_LENGTH: number,
	isDotsAdded = true,
): string => {
	if (isDotsAdded) {
		return text.length > LIMIT_LENGTH
			? `${text.substring(0, LIMIT_LENGTH)}...`
			: text;
	}
	return text.length > LIMIT_LENGTH ? text.substring(0, LIMIT_LENGTH) : text;
};
