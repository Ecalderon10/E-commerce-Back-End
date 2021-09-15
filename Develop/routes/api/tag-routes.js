const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
  const tagData = await Tag.findAll({include:[{model:Product}]});
  res.status(200).json(tagData);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
});



router.get('/:id', async (req, res) => {
try{
  const TagData = await Tag.findByPk(req.params.id,{include:[{model:Product}]})
  if(!TagData) {
    res.status(404).json({message: `There was no Tag found with id of${req.params.id}`});
  }
  res.status(200).json(TagData);
}
catch (err) {
res.status(500).json(err)
}
});

router.post('/', async (req, res) => {
try{
const newTagData = await Tag.create({
 tag_name:req.body.tag_name,
});
res.status(200).json({message:"Tag Created!"})
}
catch(err) {
  res.status(400).json(err)
}
});

router.put('/:id', async (req, res) => { 
try{
  const updatedTag = await Tag.update(req.body,{where: {id:req.params.id}});
  if(!updatedTag[0]) {
    res.status(404).json({message:`no Tag found with the id of  ${req.params.id}`})
  }
  res.status(200).json({message:`Tag with id of ${req.params.id} updated`});
}
catch(err){
  res.status(500).json(err)
}
// update a Tag by its `id` value
});

router.delete('/:id', async (req, res) => {
try{
  const deletedTag = await Tag.destroy({where:{id: req.params.id}});
if(!deletedTag){
res.status(404).json({message:`no tag with id ${req.params.id} found`})
}
res.status(200).json({message:`Tag with id ${req.params.id} deleted`})
  }
  catch(err){
  res.status(500).json(err)
  }
// delete a Tag by its `id` value
});

module.exports = router;
