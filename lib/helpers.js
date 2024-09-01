export function textAllowedSymbolValidation(str, abc) {
    return str.split('').map(s => abc.includes(s)).every(x => x === true);
}

export function firstNotAllowedSymbol(str, abc) {
    return str.split('').filter(s => !abc.includes(s))[0] ?? '';
}