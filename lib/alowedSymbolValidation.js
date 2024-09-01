import { firstNotAllowedSymbol, textAllowedSymbolValidation } from "./helpers.js";

export function validateSymbols(name) {
    const nameAllowedAbc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let errorMessage = '';
    if (!textAllowedSymbolValidation(name, nameAllowedAbc)) {
        errorMessage = `Symbomls that are not allowed were found '${firstNotAllowedSymbol(name, nameAllowedAbc)}'`
    }
    return errorMessage;
}