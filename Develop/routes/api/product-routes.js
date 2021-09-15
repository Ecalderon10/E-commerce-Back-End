const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


router.get("/", async (req, res) => {
  try {
  const productData = await Product.findAll({include:[{model:Category},{model:Tag}],
  });
  res.status(200).json(productData);
  }
  catch(err){
    res.status(500).json(err)
  }
});



router.get('/:id', async (req, res) => {
try{
  const productData = await Product.findByPk(req.params.id,{include:[{model:Category},{model:Tag}],
  });
  if(!productData) {
    res.status(404).json({message: `There was no Product found with id of${req.params.id}`});
  }
  res.status(200).json(productData);
}
catch (err) {
res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
try{
const newProductData = await Product.create(req.body);
res.status(200).json({message:"Product Created!"})
}
catch(err) {
  res.status(400).json(err)
}
});

router.put('/:id', async (req, res) => { 
try{
  const updatedProduct = await Product.update(req.body,{where:{id:req.params.id}});
  if(!updatedProduct[0]) {
    res.status(404).json({message:`no Product found with the id of  ${req.params.id}`})
  }
  res.status(200).json({message:`Product with id of ${req.params.id} updated`});
}
catch(err){
  res.status(500).json(err)
}
// update a Product by its `id` value
});

router.delete('/:id', async (req, res) => {
try{
  const deletedProduct = await Product.destroy({where:{id:req.params.id},
  });
if(!deletedProduct){
res.status(404).json({message:`no Product with id ${req.params.id} found`})
}
res.status(200).json({message:`Product with id ${req.params.id} deleted`})
  }
  catch(err){
  res.status(500).json(err)
  }
});




module.exports = router;
