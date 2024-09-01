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
-   Link exapmle - http://localhost:5019/api/account

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

## 🎅 Authors

Tomas: [Github](https://github.com/tomasban1)
