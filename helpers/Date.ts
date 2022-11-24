const DateHelper = {
    GetMonthName: (month: number) => {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return monthNames[month];
    },
    AddMonths: (date: Date, months: number) => {
        const result = new Date(date.setMonth(date.getMonth() + months));
        return result;
    }
}

export default DateHelper;