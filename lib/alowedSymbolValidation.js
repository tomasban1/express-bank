import { firstNotAllowedSymbol, textAllowedSymbolValidation } from "./helpers.js";

export function validateSymbols(fullname) {
    const nameAllowedAbc = 'AaĄąBbCcČčDdEeĘęĖėFfGgHhIiĮįYyJjKkLlMmNnOoPpRrSsŠšTtUuŲųŪūVv';
    let errorMessage = '';
    if (!textAllowedSymbolValidation(fullname, nameAllowedAbc)) {
        errorMessage = `Symbomls that are not allowed were found '${firstNotAllowedSymbol(fullname, nameAllowedAbc)}'`
    }
    return errorMessage;
}