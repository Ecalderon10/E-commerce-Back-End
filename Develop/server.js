const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection')
// import sequelize connection
const { Category, Product, ProductTag, Tag } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


const initiate = async () => {
  await sequelize.sync()

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });

}
// sync sequelize models to the database, then turn on the server
initiate();
