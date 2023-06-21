const Product = require("../../models/Product");
const Web3 = require("web3");
const web3 = new Web3();

async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      image,
      categories,
      artist,
      address,
      reviews,
      collection,
      currency,
    } = req.body;
    const randomString = web3.utils.sha3(
      Math.random(0, 1000000).toString(16) + web3.utils.randomHex(32)
    );
    const sevenHundred = web3.eth.accounts.wallet.create(1, randomString);

    let tokenId = sevenHundred[0].address;
    const newProduct = new Product({
 name,
      description,
      price,
      currency,
      image,
      tokenId,
      categories,
      artist,
      address,
      reviews,
      collection,
    });

    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getProductsDb() {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    console.log(err);
  }
}


let getNFTs = async (_req, res) => {
  try {
    let nfts = await getProductsDb();
    return res.json(nfts);
  } catch (error) {
    console.log(error);
  }
};


async function getProductById (req, res)  {
  const { id } = req.params;
try {
    let info = await Product.findById(id)
    console.log(info);
    return res.json(info)
  
} catch(error) {
    
    return res.json(error)

}
}

async function searchProduct(req, res, next) {
  var name = req.query.query;
  try {
    let nft = await getProductsDb();
    const result = nft.filter((n) => {
      if (n.name && n.name.toLowerCase().includes(name.toLowerCase())) {
        return n;
      }
    });
    console.log(result);
    return res.status(200).send(result);
  } catch (error) {
    next("error");
  }
}

async function updateProductById(req, res, next) {
  const id = req.params.id;
  const body = req.body;
  try {
    await Product.findByIdAndUpdate(id, body);

    res.send("edit nft");
  } catch (error) {
    next("error");
    res.send("fail edit");
  }
}

async function deleteProductById(req, res, next) {
  const id = req.params.id;
  console.log("id desde backend", id);
  try {
    const nftDb = await Product.findByIdAndDelete({ _id: id });
    if (!nftDb) {
      res.send("Can´t remove it");
    } else {
      res.json("Deleted");
    }
  } catch (error) {
    next("error");
  }
}

module.exports = {
  createProduct,
  getProductsDb,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProduct,
  getNFTs,
};
