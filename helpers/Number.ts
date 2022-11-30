const NumberHelper = {
    CurrencyPtBr: (number: number) => {
        return number.toFixed(2).replace(".", ",");
    }
}

export default NumberHelper;