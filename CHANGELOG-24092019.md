**POST asset**
- no **warranty**
- no **name**
- no **warranty_expiry_date**
- include **warranty_months**(not required)
- include **warranty_years**(not required)
- include **part_number**(not required)
- include **description**(not required)
- include **attachments**(not required, any type of file)
- **NOTE** change POST data from **application/json** to **formdata** to cater for files

**PUT asset**
- same as above except no **attachments** and data type remains as **application/json**


**POST user**
- include **staff_number**(required)

**GET assets/:assetId**
- will now show all attachments if there exist any in an array of **Assetattachments**

**New endpoint for files: GET /files/filename**
- find this in the docs (file folder)
- On fetching a single asset, you will find the filename in the object in the array of objects. note the name has an extension eg.png

**BEFORE RUNNING**
- in `.env` , add `FILES_BASE` key to store the location where you want your files stored. Check `.env-demo` for a demo
```sh 
    npm install 
```
```sh 
    sequelize db:migrate
```
```sh 
    node app
```
