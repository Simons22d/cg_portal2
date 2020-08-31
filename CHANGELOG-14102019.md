**Departments**
- POST, PUT, DELETE, GET ALL, GET BY ID departments
- details on `department` folder on postman

**POST asset**
- new fields : `privacy` : TEXT | optional, `privacy_doc`: document | optional

**POST user**
- new fields : `email`: email | required, `department_id`: uuid | required

**PUT user** (update)
- refer on postman

**DELETE user**
- refer on postman

**GET users in department**
- refer on postman : /users/department/{department-id} 

**RUNNING**
```sh 
    sequelize db:migrate
```
```sh 
    node app
```
