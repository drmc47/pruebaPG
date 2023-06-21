const Order = require("../../models/Orders");


async function createOrder(req, res) {
  try {
    const { items } = req.body;


    const newOrder = new Order({
        items,
    });

    const orderShoppingCart = await newOrder.save();
    res.status(201).json(orderShoppingCart);

  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function getOrder(req, res) {
    const { id } = req.params;
    const idPrueba = "613afd22be0b221b1087229a"
    try {
        const myOrder = await Order.find()
        console.log(myOrder)
        return res.json(myOrder)

    } catch(error) {
        console.log("No se pudo traer los productos", error)
        return res.json(error)
    }
}


// async function updateProfileById(req, res, next) {

// }

// async function deleteProfileById(req, res, next) {
 
// }

module.exports = {
    createOrder,
    getOrder,
};
