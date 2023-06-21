const Categorie = require("../../models/Categories");

async function createCategorie(req, res, next) {
  try {
    const { name } = req.body;

    const newCategorie = new Categorie({ name });

    const categorieSaved = await newCategorie.save();
    res.status(201).json(categorieSaved);
  } catch (error) {
    next("Error");
    res.json(error);
  }
}

async function getCategoriesDb() {
  try {
    const categories = await Categorie.find();
    return categories;
  } catch (err) {
    console.log(err);
  }
}

let getCategories = async (_req, res, next) => {
  try {
    let cats = await getCategoriesDb();
    return res.json(cats);
  } catch (error) {
    next("Error");
  }
};

async function updateCategorieById(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  try {
    await Categorie.findByIdAndUpdate(id, body);

    res.send("edit categorie");
  } catch (error) {
    next("error");
    res.send("fail edit categorie");
  }
}

async function deleteCategorieById(req, res, next) {
  const id = req.params.id;
  try {
    const cat = await Categorie.findByIdAndDelete({ _id: id });
    if (!cat) {
      res.send("Can´t remove it");
    } else {
      res.json(cat);
    }
  } catch (error) {
    next("error");
  }
}

module.exports = {
  createCategorie,
  getCategoriesDb,
  updateCategorieById,
  deleteCategorieById,
  getCategories,
};
