**POST asset**
- add `finance_netbook` (not required)
- add `staff_number` (not required) - will automatically assign 
asset to that staff

**PUT asset**
- add `finance_netbook` (not required)

**GET localhost:3700/asset-allocations/current/asset/c6daf84d-5cca-4100-9805-04c4c1c34961**
- asset currently allocated to whom
- more details on postman under `asset_allocations` folder

**BEFORE RUNNING**
```sh 
    sequelize db:migrate
```
```sh 
    node app
```