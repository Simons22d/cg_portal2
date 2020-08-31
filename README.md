# Asset Management API
### installation
```sh
git clone https://github.com/chege-kimaru/asset-management-api.git
cd asset-management-api
npm i
```
* change the name of `.env-demo` file to `.env`
* Open `.env` and fill in the missing environment variables accordingly
* change the name of `config/config-demo.json` to `config/config.json`
* Open `config/config.json` and fill in the database songigurations variables depending on your environment.

```sh
npx sequelize-cli db:create
npx sequelize-cli db:migrate --env my_env
```

The above commands will create the database (so no need of creating it manually) for you and all its tables depending on the environment in the command. Replace `my_env` with `production/development/test` depending on the environment you want.

Run the app to test the configuration.
```sh
node app
```
