const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const apiCompany = require("./app/api/company");
const apiProduct = require("./app/api/product");
const apiOrder = require("./app/api/order");

const app = express();
app.use(bodyParser.json());

apiCompany(app, db);
apiProduct(app, db);
apiOrder(app, db);

db.sequelize.sync({force: true}).then(() => {
  app.listen(8080, () => console.log("App listening on port 8080!"));
});