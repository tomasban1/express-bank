export function convertMoney(money) {
    let toEur = (money / 100) + ' Eur';

    return toEur;
}


// export function convertMoney(money) {
//     const str = money.toString();
//     const int = str.split('.');
//     return Number(money.toFixed(2).replace('.', '').padEnd(int.length === 1 ? 3 : 4, '0'))
// }