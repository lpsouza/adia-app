const DateHelper = {
    GetMonthName: (month: number) => {
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        return monthNames[month];
    },
    AddMonths: (date: Date, months: number) => {
        const result = new Date(date.setMonth(date.getMonth() + months));
        return result;
    },
    DatePtBr: (date: Date) => {
        const day: string = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate().toString();
        const month: string = date.getUTCMonth() < 9 ? `0${date.getUTCMonth() + 1}` : (date.getUTCMonth() + 1).toString();
        const year: string = date.getUTCFullYear().toString();
        return `${day}/${month}/${year}`;
    },
    FirstDateOfMonth: (date: Date) => {
        return new Date(date.getUTCFullYear(), date.getMonth(), 1);
    },
    EndDateOfMonth: (date: Date) => {
        return new Date(date.getUTCFullYear(), date.getMonth() + 1, 0);
    }
}

export default DateHelper;