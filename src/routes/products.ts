
var express = require('express');
var router = express.Router();
const db = require('../database/connection');
const auth = require('../middleware/tokenvalidator');
const product = db.Products;

/* GET Products listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/getAllProducts', async function (req, res, next) {
  const data = await product.findAll();
  res.send(data);
});
router.post('/insertAproduct',auth, async (req, res )=>{
  try {
    const data = await product.create(
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
      }
    );
    return res.json({data:data, token:req.token,message:'data submited successfully'}).status(200);

    
  } catch (error) {
    return res.json(error);
  }

})
module.exports = router;