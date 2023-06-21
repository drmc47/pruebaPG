const User= require("../../models/User");

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
 }   

async function shoppingCartDB(req, res, next) {
    try {
      const userToken  = req.body.user;  
      const idItem=req.body.id
      const userCart = await User.findOne({token:userToken})
      let cart=userCart.shoppingCart.concat(idItem)
      let filter=cart.filter(onlyUnique )
      userCart.shoppingCart=filter
      userCart.save()
      return res.send(userCart.shoppingCart)
     
    } catch (error) {
      next("Error");
      res.json(error);
    }
  }
  
  module.exports = {
    shoppingCartDB
};