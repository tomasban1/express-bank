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

const accountList = [];

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

    accountList.push({
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
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



app.listen(port, () => {
    console.log(`App running on: http:localhost:${port}`);
});