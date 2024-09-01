

export function validateName(name, surname) {
    const minLength = 2;
    const maxLength = 20;
    let errorMessage = '';
    if (name.length < minLength || surname.length < minLength) {
        errorMessage = `Person name and surname has to be ${minLength} chacakters or more.`;
    } else if (name.length > maxLength || surname.length > maxLength) {
        errorMessage = `Person name and surname cannot be longer than ${maxLength} chacakters.`;
    } else if (name[0].toUpperCase() !== name[0] || surname[0].toUpperCase() !== surname[0]) {
        errorMessage = `Person name and surname has to start with uppercase letter.`;
    } else if (name === surname) {
        errorMessage = 'Name and Surname cannot be the same';
    } else if (typeof name !== 'string' || typeof surname !== 'string') {
        errorMessage = 'Name and Surname must be text format';
    }
    return errorMessage;
}