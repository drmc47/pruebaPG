const User= require("../../models/User");

async function deleteCart(req, res, next) {
    try {
      const item = req.body.item; 
      const userToken=req.body.user; 
      const userCart = await User.findOne({token:userToken})
      let cart=userCart.shoppingCart.filter(e=>{if (e != item)return e})
      userCart.shoppingCart=cart
      userCart.save()
      return res.send(userCart.shoppingCart)
           
    } catch (error) {
      next("Error");
      res.json(error);
    }
  }
  
  module.exports = {
    deleteCart
};