
export function validateData(body) {
    let errorMessage = '';
    if (typeof body !== 'object'
        || Array.isArray(body)
        || body === null) {
        errorMessage = `Wrong data type.`;
    }
    return errorMessage;
}
