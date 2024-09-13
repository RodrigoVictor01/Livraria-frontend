// const formatDate = (dateString: string): string => {
//     if (!dateString) return 'Desconhecido';
//     if (dateString.length === 4) return dateString;

//     const [year, month, day] = dateString.split('-');
//     const paddedDay = day.padStart(2, '0');
//     const paddedMonth = month.padStart(2, '0');

//     return `${paddedDay}/${paddedMonth}/${year}`;
// };

// export default formatDate;


const formatDate = (dateString: string): string => {
    if (!dateString) return 'Desconhecido';
    if (dateString.length === 4) return dateString; // Caso de apenas ano

    // Verifica se o dateString está no formato esperado (YYYY-MM-DD)
    const partsDate = dateString.split('-');
    if (partsDate.length !== 3) return 'Desconhecido';

    const [year, month, day] = partsDate;

    // Certifica-se de que day e month são strings válidas antes de usar padStart
    const paddedDay = day && day.trim() ? day.padStart(2, '0') : '00';
    const paddedMonth = month && month.trim() ? month.padStart(2, '0') : '00';

    return `${paddedDay}/${paddedMonth}/${year}`;
};

export default formatDate;