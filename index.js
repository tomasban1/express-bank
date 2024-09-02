import express from 'express';
import { validateData } from './lib/validateData.js';
import { validateAge } from './lib/validateAge.js';
import { validateName } from './lib/validateName.js';
import { validateSymbols } from './lib/alowedSymbolValidation.js';
import { convertMoney } from './lib/convertMoney.js';
import { accountList } from './data/accountData.js';
import { getIndex } from './lib/getIndex.js';



const app = express();
const port = 5019;

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Home page');
});

app.get('/api', (req, res) => {
    const data = {
        state: 'Error',
        message: 'Give a specific API endpoint',
    };
    return res.json(data);
});

app.get('/api/account', (req, res) => {
    return res.json(accountList)
});

app.post('/api/account', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const fullname = name + surname;

    const dataError = validateData(req.body);
    if (dataError !== '') {
        return res.json({
            status: 'error',
            message: dataError,
        });
    }
    const ageError = validateAge(req.body.dateOfBirth)
    if (ageError !== '') {
        return res.json({
            status: 'error',
            message: ageError,
        });
    }

    const symbolError = validateSymbols(fullname);
    if (symbolError !== '') {
        return res.json({
            status: 'error',
            message: symbolError,
        });
    }

    const nameError = validateName(name, surname);
    if (nameError !== '') {
        return res.json({
            status: 'error',
            message: nameError,
        });
    }

    for (const person of accountList) {
        if (person.name === name
            && person.surname === surname
            && person.dateOfBirth === req.body.dateOfBirth) {
            return res.json({
                state: 'Error',
                message: 'Account with the same data already exists.',
            });
        }
    }

    if (isNaN(new Date(req.body.dateOfBirth))) {
        return res.json({
            status: 'error',
            message: `Invalid date format. Expected format: YYYY-MM-DD`,
        });
    }

    console.log(req.body);

    accountList.push({
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        accMoneyBalance: 0
    });

    return res.json({
        state: 'success',
        message: 'Account has been added',
    });
});

app.get('/api/account/:name-:surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surName = req.params.surname.toLowerCase();
    for (const person of accountList) {
        if (person.name.toLowerCase() === name && person.surname.toLowerCase() === surName) {
            return res.send(`${person.name} ${person.surname}, born in ${person.dateOfBirth}`)
        }
    }
    return res.json({
        state: 'Error',
        message: 'Such person does not exist.',
    });

});

app.delete('/api/account/:name-:surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'Error',
            message: 'No account with such person.',
        });
    }

    if (parseFloat(accountList[index].accMoneyBalance) > 0) {
        return res.json({
            state: 'Error',
            message: `Money balance has to be 0 to delete account. Current money balance: ${accountList[index].accMoneyBalance}`,
        });
    }

    accountList.splice(index, 1);
    return res.json({
        state: 'Success',
        message: 'Account successfully deleted',
    });
});

app.put('/api/account/:name-:surname', (req, res) => {
    const newName = req.body.newName;
    const newSurname = req.body.newSurname;
    const newDOB = req.body.newDateOfBirth;
    const oldName = req.params.name.toLowerCase();
    const oldSurname = req.params.surname.toLowerCase();
    let index = getIndex(oldName, oldSurname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    if (isNaN(new Date(newDOB))) {
        return res.json({
            status: 'error',
            message: `Invalid date format. Expected format: YYYY-MM-DD`,
        });
    }

    if (oldName === accountList[index].name.toLowerCase() && oldSurname === accountList[index].surname.toLowerCase()) {
        if (newName) {
            accountList[index].name = newName;
        }
        if (newSurname) {
            accountList[index].surname = newSurname;
        }
        if (newDOB) {
            accountList[index].dateOfBirth = newDOB;
        }

        return res.json({
            state: 'success',
            message: 'Account data successfuly updated.'
        });
    }
});

app.get('/api/account/:name-:surname/name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    if (accountList[index].name.toLowerCase() === name && accountList[index].surname.toLowerCase() === surname) {
        return res.send(accountList[index].name)
    }

});

app.put('/api/account/:name-:surname/name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const newName = req.body.newName;
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    const nameError = validateName(newName, accountList[index].surname);
    if (nameError !== '') {
        return res.json({
            status: 'error',
            message: nameError,
        });
    }

    const symbolError = validateSymbols(newName);
    if (symbolError !== '') {
        return res.json({
            status: 'error',
            message: symbolError,
        });
    }

    accountList[index].name = newName;
    return res.json({
        state: 'success',
        message: 'Person name succesfully updated.'
    });

});

app.get('/api/account/:name-:surname/surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    return res.send(accountList[index].surname)

});

app.put('/api/account/:name-:surname/surname', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const newSurname = req.body.newSurname;
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    const nameError = validateName(accountList[index].name, newSurname);
    if (nameError !== '') {
        return res.json({
            status: 'error',
            message: nameError,
        });
    }

    const symbolError = validateSymbols(newSurname);
    if (symbolError !== '') {
        return res.json({
            status: 'error',
            message: symbolError,
        });
    }

    accountList[index].surname = newSurname;
    return res.json({
        state: 'success',
        message: 'Person surname succesfully updated.'
    });
});

app.get('/api/account/:name-:surname/dob', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    return res.send(accountList[index].dateOfBirth)
});

app.put('/api/account/:name-:surname/dob', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const newDob = req.body.newDateOfBirth;
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'Person by that name dosent exist.'
        });
    }

    if (isNaN(new Date(newDob))) {
        return res.json({
            status: 'error',
            message: `Invalid date format. Expected format: YYYY-MM-DD`,
        });
    }

    const ageError = validateAge(newDob)
    if (ageError !== '') {
        return res.json({
            status: 'error',
            message: ageError,
        });
    }

    accountList[index].dateOfBirth = newDob;

    return res.json({
        state: 'success',
        message: 'Person date of birth succesfully updated.'
    });
});

app.post('/api/withdrawal', (req, res) => {
    const name = req.body.name.toLowerCase();
    const surname = req.body.surname.toLowerCase();
    const moneyToWithdraw = req.body.moneyAmmount;
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'No person with such account.'
        });
    }

    if (typeof moneyToWithdraw !== 'number' || moneyToWithdraw === NaN) {
        return res.json({
            state: 'error',
            message: 'Money ammount has to be a number.'
        });
    }

    if (moneyToWithdraw > accountList[index].accMoneyBalance) {
        return res.json({
            state: 'error',
            message: `Not enough money left in the account to withdraw. Acc balance: ${accountList[index].accMoneyBalance}`
        });
    }

    let parsed = parseFloat(accountList[index].accMoneyBalance)
    let transaction = parsed -= parseFloat(convertMoney(moneyToWithdraw));
    accountList[index].accMoneyBalance = transaction.toFixed(2) + ' Eur'

    return res.json({
        state: 'success',
        message: `Money succesfully withdrawn from ${accountList[index].name} ${accountList[index].surname}: ${convertMoney(moneyToWithdraw)}`
    });

});

app.post('/api/deposit', (req, res) => {
    const name = req.body.name.toLowerCase();
    const surname = req.body.surname.toLowerCase();
    const moneyToDeposit = req.body.moneyAmmount;
    let index = getIndex(name, surname);

    if (index === -1) {
        return res.json({
            state: 'error',
            message: 'No person with such account.'
        });
    }

    if (typeof moneyToDeposit !== 'number' || moneyToDeposit === NaN) {
        return res.json({
            state: 'error',
            message: 'Money ammount has to be a number.'
        });
    }

    let parsed = parseFloat(accountList[index].accMoneyBalance)
    let transaction = parsed += parseFloat(convertMoney(moneyToDeposit));
    accountList[index].accMoneyBalance = transaction.toFixed(2) + ' Eur';


    return res.json({
        state: 'success',
        message: `Money succesfully deposited to ${accountList[index].name} ${accountList[index].surname}: ${convertMoney(moneyToDeposit)}`
    });
});

app.post('/api/transfer', (req, res) => {
    const fromName = req.body.fromName.toLowerCase();
    const fromSurname = req.body.fromSurname.toLowerCase();
    const toName = req.body.toName.toLowerCase();
    const toSurname = req.body.toSurname.toLowerCase();
    const money = req.body.moneyAmmount;

    let fromIndex = getIndex(fromName, fromSurname);
    let toIndex = getIndex(toName, toSurname);

    if (fromIndex === -1) {
        return res.json({
            state: 'error',
            message: 'Person you want to trasfer from dosent exist'
        });
    }

    if (toIndex === -1) {
        return res.json({
            state: 'error',
            message: 'Person you want to trasfer to dosent exist'
        });
    }

    if (typeof money !== 'number' || money === NaN) {
        return res.json({
            state: 'error',
            message: 'Money ammount has to be a number.'
        });
    }

    if (fromName === toName && fromSurname === toSurname) {
        return res.json({
            state: 'error',
            message: 'Cannot trasfer money to the same account'
        });
    }
    let parsedFrom = parseFloat(accountList[fromIndex].accMoneyBalance)
    if (parsedFrom < parseFloat(convertMoney(money))) {
        return res.json({
            state: 'error',
            message: `Insufficient account money balance. Money left: ${accountList[fromIndex].accMoneyBalance}`
        });
    }


    let transactionFrom = parsedFrom -= parseFloat(convertMoney(money));
    accountList[fromIndex].accMoneyBalance = transactionFrom.toFixed(2) + ' Eur';

    let parsedTo = parseFloat(accountList[toIndex].accMoneyBalance)
    let transactionTo = parsedTo += parseFloat(convertMoney(money));
    accountList[toIndex].accMoneyBalance = transactionTo.toFixed(2) + ' Eur';

    return res.json({
        state: 'success',
        message: `${convertMoney(money)} successfully transfered from ${accountList[fromIndex].name} ${accountList[fromIndex].surname} to ${accountList[toIndex].name} ${accountList[toIndex].surname}.`
    });

})
app.get('*', (req, res) => {
    console.log('404');
    return res.json({
        status: 'error',
        message: "404 page not found"
    });
})


app.listen(port, () => {
    console.log(`App running on: http:localhost:${port}`);
});



