![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
![Gluten Status](https://img.shields.io/badge/Gluten-Free-green.svg)
![Eco Status](https://img.shields.io/badge/ECO-Friendly-green.svg)
[![Discord](https://discord.com/api/guilds/571393319201144843/widget.png)](https://discord.gg/dRwW4rw)

# Bank

Express Js Bank project

<br>

## 🌟 About

Purpose of this project is to learn how to work using express Js.

## 🎯 Project features/goals

-   API
-   Data transfer/edit/delete

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

Insomnia - download and install

```
https://insomnia.rest/download
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo
    ```sh
    git clone https://github.com/tomasban1/express-bank .
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
    or
    ```sh
    npm install
    ```
3. Run the server
    ```sh
    npm run dev
    ```

### /api/account

> POST:

-   Creates a new account
-   HTTP method - POST
-   Data transfer format - JSON
-   Link exapmle: http://localhost:5019/api/account

Data:

```
{
	"name": "Person name",
	"surname": "Person surname",
	"dateOfBirth": "YYYY-MM-DD"
}
```

Requirements:

-   Person has to be 18 years old or older
-   Name and Surname cannot be the same, and first letters have to be uppercase
-   Only english alphabet
-   Name and Surname have to be at least 2 symbols long and max 20 symbols long

### /api/account/{name}-{surname}

> GET:

-   HTTP method - GET
-   Link example: http://localhost:5019/api/account/{name}-{surname}
-   Returns account owner name, surname, and date of birth

> DELETE:

-   Deletes account

Requirements:

-   Account can only be deleted, if account money balance is 0

> PUT:

-   HTTP method - PUT
-   Updates account data
-   Data transfer format - JSON

Data:

```
{
	"newName": "Person name",
	"newSurname": "Person surname",
	"newDateOfBirth": "YYYY-MM-DD"
}
```

### /api/account/name

> GET:

-   HTTP method - GET
-   Returns account owner name
-   Link example: http://localhost:5019/api/account/{name}-{surname}/name

> PUT:

-   HTTP method - PUT
-   Updates account owner name

Data:

```
{
	"newName": "Person name"
}
```

Requirements:

-   Name has to be at least 2 characters long, and max 20 characters long
-   Only english alphabet

### /api/account/surname

> GET:

-   HTTP method - GET
-   Returns account surname
-   Link example: http://localhost:5019/api/account/{name}-{surname}/surname

> PUT:

-   HTTP method - PUT
-   Updates account surname

Data:

```
{
	"newSurname": "Person surname"
}
```

Requirements:

-   Name has to be at least 2 characters long, and max 20 characters long
-   Only english alphabet

### /api/account/dob

> GET:

-   HTTP method - GET
-   Returns account owner date of birth
-   Link example: http://localhost:5019/api/account/{name}-{surname}/dob

> PUT:

-   HTTP method - PUT
-   Updates account owner date of birth

Data:

```
{
	"newDateOfBirth": "YYYY-MM-DD"
}
```

### /api/withdrawal

> POST

-   HTTP method - POST
-   Link example: http://localhost:5019/api/withdrawal
-   Withdraws money from an account, which is in the data

Data:

```
{
	"moneyAmmount": Number,
	"name": "Account owner name",
	"surname": "Account owner surname"
}
```

### /api/deposit

> POST:

-   HTTP method - POST
-   Link example: http://localhost:5019/api/deposit
-   Deposits money to an account, which is in the data

Data:

```
{
	"moneyAmmount": Number,
	"name": "Account owner name",
	"surname": "Account owner surname"
}
```

### /api/transfer

> POST

-   HTTP method - POST
-   Link example: http://localhost:5019/api/transfer
-   Transfers money from one account to another

Data:

```
{
	"fromName": "Account owner name",
	"fromSurname": "Account owner surname",
	"toName": "Account owner name",
	"toSurname": "Account owner surname",
	"moneyAmmount": Number
}
```

## All money transfers are in cents!!

## 🎅 Authors

Tomas: [Github](https://github.com/tomasban1)
