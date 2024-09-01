export function validateAge(dateOfBirth) {
    let personDate = new Date(dateOfBirth);
    let currDate = new Date();
    let diff = new Date(currDate - personDate);
    let age = Math.abs(diff.getUTCFullYear() - 1970);
    let errorMessage = '';

    if (age < 18) {
        errorMessage = 'Person has to be 18 years or older.';
    }
    return errorMessage;
}