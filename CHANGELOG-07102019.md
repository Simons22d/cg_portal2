**Updates on Return asset endpoint**
- use `asset_id` instead of `assetassignment_id`. Refer on postman docs `asset-allocations/allocate`

**New endpoint: reallocate asset**
- check it out on `asset-allocations/reallocate`

**New endpoint: dispose asset**
- check it out on `assets/{assetId}/dispose`

**RUNNING**
```sh 
    sequelize db:migrate
```
```sh 
    node app
```
