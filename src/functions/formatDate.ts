const formatDate = (dateString: string): string => {
    if (!dateString) return 'Desconhecido';
    if (dateString.length === 4) return dateString;

    const partsDate = dateString.split('-');
    if (partsDate.length !== 3) return 'Desconhecido';

    const [year, month, day] = partsDate;

    const paddedDay = day && day.trim() ? day.padStart(2, '0') : '00';
    const paddedMonth = month && month.trim() ? month.padStart(2, '0') : '00';

    return `${paddedDay}/${paddedMonth}/${year}`;
};

export default formatDate;