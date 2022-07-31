# ForYou
A project being made for journalling freely and safely with encryption so that, no one can read your writings without your permissions

This project is still under development. We are building the API's right now, and soon would start working on the frontend part of the project as well.

<b>Things Required to run the project</b>
1. Node
2. Redis
3. Postresql

<b>How to run the project</b>
1. Download the project
2. Run the command ```npm install```
3. Make a new .env file and add all the necessary credentials (consider example file -> .env.example)

<b>Tables to be created</b>
1. ```CREATE TABLE USERS (id VARCHAR(50) PRIMARY KEY, email VARCHAR(50) UNIQUE, name VARCHAR(50))```
