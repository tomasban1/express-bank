import express from 'express';
import { validateData } from './lib/validateData.js';
import { validateAge } from './lib/validateAge.js';
import { validateName } from './lib/validateName.js';
import { validateSymbols } from './lib/alowedSymbolValidation.js';



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

export const accountList = [];

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

    console.log(req.body);

    accountList.push({
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        accMoneyBalance: req.body.accMoneyBalance
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
    const surName = req.params.surname.toLowerCase();
    for (const person of accountList) {
        if (person.accMoneyBalance > 0) {
            return res.json({
                state: 'Error',
                message: 'Money balance has to be 0 to delete account',
            });
        }
        if (person.name.toLowerCase() === name && person.surname.toLowerCase() === surName) {
            accountList.splice(person, 1);
            return res.json({
                state: 'Success',
                message: 'Account successfully deleted',
            });
        }
    }
    return res.json({
        state: 'Error',
        message: 'No account with such person.',
    });
});

app.put('/api/account/:name-:surname', (req, res) => {
    const newName = req.body.newName;
    const newSurname = req.body.newSurname;
    const newDOB = req.body.newDateOfBirth;
    const oldName = req.params.name;
    const oldSurname = req.params.surname;

    for (const person of accountList) {
        if (oldName === person.name.toLowerCase() && oldSurname === person.surname.toLowerCase()) {
            if (newName) {
                person.name = newName;
            }
            if (newSurname) {
                person.surname = newSurname;
            }
            if (newDOB) {
                person.dateOfBirth = newDOB;
            }

            return res.json({
                state: 'success',
                message: 'Account data successfuly updated.'
            });
        }
    }
    return res.json({
        state: 'error',
        message: 'Person by that name dosent exist.'
    });

});

app.get('/api/account/:name-:surname/name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();

    let index = accountList.findIndex(acc => acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname);
    for (const acc of accountList) {
        if (acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname) {
            return res.send(accountList[index].name)
        }
    }
});

app.put('/api/account/:name-:surname/name', (req, res) => {
    const oldName = req.params.name.toLowerCase();
    const oldSurname = req.params.surname.toLowerCase();
    const newName = req.body.newName;
    let index = accountList.findIndex(acc => acc.name.toLowerCase() === oldName && acc.surname.toLowerCase() === oldSurname);

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
    let index = accountList.findIndex(acc => acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname);

    return res.send(accountList[index].surname)

});

app.put('/api/account/:name-:surname/surname', (req, res) => {
    const oldName = req.params.name.toLowerCase();
    const oldSurname = req.params.surname.toLowerCase();
    const newSurname = req.body.newSurname;
    let index = accountList.findIndex(acc => acc.name.toLowerCase() === oldName && acc.surname.toLowerCase() === oldSurname);

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
    let index = accountList.findIndex(acc => acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname);

    return res.send(accountList[index].dateOfBirth)
});

app.put('/api/account/:name-:surname/dob', (req, res) => {
    const name = req.params.name.toLowerCase();
    const surname = req.params.surname.toLowerCase();
    const newDob = req.body.newDateOfBirth;
    let index = accountList.findIndex(acc => acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname);

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

app.get('*', (req, res) => {
    console.log('404');
    return res.json({ status: 'error', message: "404 page not found" });
})



app.listen(port, () => {
    console.log(`App running on: http:localhost:${port}`);
});


const getIndex = (name, surname) => accountList.findIndex(acc => acc.name.toLowerCase() === name && acc.surname.toLowerCase() === surname);

