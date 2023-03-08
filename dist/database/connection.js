"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const con = new sequelize_1.Sequelize("sequlize", "root", "", {
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
let db = {};
db.Sequelize = sequelize_1.Sequelize;
db.con = con;
if (require("../models/user")(con)) {
    db.Users = require("../models/user")(con);
}
if (require("../models/product")(con)) {
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
//# sourceMappingURL=connection.js.map