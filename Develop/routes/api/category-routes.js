const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  router.get("/", async (req, res) => {
    try {
    const categoryData = await Category.findAll({include:[{model:Product}]});
    res.json(categoryData);
    }

    catch(err){
      res.status(500).json(err)
    }
  });



router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{include:[{model:Product}]})
    if(!categoryData) {
      res.status(404).json({message: `There was no category found with id of${req.params.id}`});
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
  try{
const newCatergoryData = await Category.create(req.body);
res.status(200).json({message:"Category Created!"})
}
  catch(err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => { 
  try{
    const updatedCategory = await Category.update(req.body,{where: {id:req.params.id}});
    if(!updatedCategory[0]) {
      res.status(404).json({message:`no category found with the id of  ${req.params.id}`})
    }
    res.status(200).json({message:`Category with id of ${req.params.id} updated`});
  }
  catch(err){
    res.status(500).json(err)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try{
    const deletedCategory = await Category.destroy({where:{id:req.params.id},
    });
  if(!deletedCategory){
  res.status(404).json({message:`no Category with id ${req.params.id} found`})
  }
  res.status(200).json({message:`CAtegory with id ${req.params.id} deleted`})
    }
    catch(err){
    res.status(500).json(err)
    }
  });

module.exports = router;
