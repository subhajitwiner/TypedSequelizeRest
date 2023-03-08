import { Sequelize } from 'sequelize';
const con = new Sequelize("sequlize", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
con
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
let db: any={};
db.Sequelize = Sequelize;
db.con = con;
if(require("../models/user")(con)){
  db.Users = require("../models/user")(con);
}
if(require("../models/product")(con)){
  db.Products = require("../models/product")(con);
}
db.con
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("resync done");
  })
  .catch((syncerr) => {
    console.log(syncerr);
  });
module.exports = db;
