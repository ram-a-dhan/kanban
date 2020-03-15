# __kanban__

Client-Side Deploy Link:
https://kan-ban-zai.firebaseapp.com/

Server-Side Deploy Link /
API Endpoint Base URL:
https://desolate-temple-85320.herokuapp.com

Complete API Documentation Link
(w/ example requests & responses):
https://documenter.getpostman.com/view/10571856/SzS2xTa9

---

## __Introduction__
This app was written in Javascript & made using NodeJS along with the following core NPM packages:
- bcrypt
- cors
- dotenv
- express
- http-errors
- jsonwebtoken
- pg
- sequelize

---

## __Features__
What you can do with / get from this API:
- register
- login
- add new task
- show all your tasks
- find one task
- edit task
- delete task

---

## __Data__
The JSON-formatted data being read and written by this API comprises 2 types:

1. user

    - "email" (string) Contains user email address.
    - "password" (string) Contains user password

2. task

    - "title" (string) Contains the title of the task
    - "category" (string) Contains the phase of the task. The default options are:
        - "Planning"
        - "Development"
        - "Testing"
        - "Production"
    - "description" (text) contains further explanation & details of the task.