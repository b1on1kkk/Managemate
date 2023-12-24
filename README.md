## Tech stack:

MySQL database (phpmyadmin), Next TS + React TS, Node JS + Express JS, tailwind

## Connecting users with projects with many to many relation ship

In policy of this project, users can have many project and many projects can have many members therefore I used many to many relationship

![image](https://github.com/b1on1kkk/Managemate/assets/114521829/bc669ec4-8ee6-4f26-b326-8569671da510)

## Creating account and entering account

When user wanna create a new account, for each new account web-app creates unique hash-key that is using in future as identity of this person and based on this hash-key session created

This schema may help you underestand:

![image](https://github.com/b1on1kkk/Managemate/assets/114521829/1b1a0ff4-2ecf-4223-bccb-38c441c846b4)

## Functionality

After creating a new account, or enter to exist one, page of projects will appear:

![image](https://github.com/b1on1kkk/Managemate/assets/114521829/32128168-6617-4d7d-952a-e20e78a9de83)

Here you can create a new project:

![image](https://github.com/b1on1kkk/Managemate/assets/114521829/cec5493e-d0fd-4597-9072-e6320a1e101e)

Invite members, cooperate and deal with problems together:

![image](https://github.com/b1on1kkk/Managemate/assets/114521829/82f2d6da-caac-4e2c-85f8-07fed23dfd62)

![image](https://github.com/b1on1kkk/Managemate/assets/114521829/d58ba08f-4c7c-419a-9739-2a3ccc2ec48e)

## Getting Started

Use XAMPP to create local server and start local MySQL database.
Open app and turn on Apache and MySQL buttons:

![image](https://github.com/b1on1kkk/YandexEda-webpage/assets/114521829/23bf8433-1544-4c79-a785-7b32e9e761e1)

Open [PhpMyAdmin](http://localhost/phpmyadmin/index.php) with your browser to see the result.

## Importing database to PhpMyAdmin:
Download sql file from database-sql-file folder and import it

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
