import express from 'express';


const app = express();
const port = 5019;

app.use(express.json());
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
    let personDate = new Date(req.body.dateOfBirth);
    let currDate = new Date();
    let diff = new Date(currDate - personDate);
    let age = Math.abs(diff.getUTCFullYear() - 1970);

    const name = req.body.name;
    const surname = req.body.surname;

    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null) {
        return res.json({
            status: 'error',
            message: 'Wrong data type.',
        });
    }

    if (age < 18) {
        return res.json({
            state: 'Error',
            message: 'Person has to be 18 years or older to create an account',
        });
    }

    if (name === surname) {
        return res.json({
            state: 'Error',
            message: 'Name and Surname cannot be the same',
        });
    }

    if (typeof name !== 'string' || typeof surname !== 'string') {
        return res.json({
            state: 'Error',
            message: 'Name and Surname must be text format',
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

    const minLength = 2;
    const maxLength = 20;
    if (name.length < minLength || surname.length < minLength) {
        return res.json({
            state: 'Error',
            message: `Person name and surname has to be ${minLength} chacakters or more.`,
        });
    }

    if (name.length > maxLength || surname.length > maxLength) {
        return res.json({
            state: 'Error',
            message: `Person name and surname cannot be longer than ${maxLength} chacakters.`,
        });
    }

    if (name[0].toUpperCase() !== name[0] || surname[0].toUpperCase() !== surname[0]) {
        return res.json({
            state: 'Error',
            message: `Person name and surname has to start with uppercase letter.`,
        });
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
        } else {
            return res.json({
                state: 'Error',
                message: 'No account with such person.',
            });
        }
    }

    return res.json({
        state: 'success',
        message: 'Person name successfuly updated.'
    })

});

app.get('/api/account/:name-:surname/:personName', (req, res) => {
    const name = req.params.personName.toLowerCase();
    if (typeof name !== 'string') {
        return res.json({
            state: 'error',
            message: 'Person name has to be text.'
        })
    }
    for (const acc of accountList) {
        if (acc.name.toLowerCase() === name) {
            return res.send(acc.name)
        } else {
            return res.json({
                state: 'error',
                message: 'Person by that name dosent exist'
            });
        }
    }
});

app.put('/api/account/:name-:surname/:personName', (req, res) => {
    const oldName = req.params.name.toLowerCase();
    const oldSurname = req.params.surname.toLowerCase();
    const newName = req.body.newName;

    for (const acc of accountList) {
        if (oldName === acc.name.toLowerCase() && oldSurname === acc.surname.toLowerCase()) {
            if (newName) {
                acc.name = newName;
                return res.json({
                    state: 'success',
                    message: 'Person name succesfully updated.'
                });
            }
        }
    }

});



app.listen(port, () => {
    console.log(`App running on: http:localhost:${port}`);
});