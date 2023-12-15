# Project ``L.U.I.S.``
by Alfonso and Mert

---

Project ``L.U.I.S.`` (Lecturer User Integration System) began as a concept for the integrating an organizations internal systems, programs, clients and admin.

For brevity during the course of planning, it has currently transitioned into a dynamic bootcamp program directory as navigated by an admin user (bootcamp instructor).

### App Features + CRUD

- Access permitted only to logged users

- Three models in the database with interactivity between them

- Welcome / home, profile, bootcamp and bootcamp modules pages

- ***CRUD:*** ``signup`` to create a persistent user account 

- ``login`` with your credentials

- ``logout``

- ***CRUD:*** ``delete account`` to permanently remove the user from the database and all authorization permissions and records from local storage

- ***CRUD:*** display and edit user profile

- ***CRUD:*** create, display, edit and delete listed bootcamps

- ***CRUD:*** create, display, edit and delete listed modules

### Run

- ``npm run dev`` will open at ``port=5005`` --> run in tandem with the frontend program using ``npm run dev -- --port=3000``

- Demo the app [here](https://project-luis.netlify.app/)

### Work-in-progress

- CSS organization and dynamic response

- Functionality for student users with different features and limited comparative CRUD

- More complex interactivity between models and users

- Scaling to allow the app to work not just in a bootcamp and/or general school environment, but something that businesses can also use
    - ie. bootcamps/models/students/teachers --> departments/projects/staff/managers, etc.

