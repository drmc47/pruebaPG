const Stripe = require('stripe');
const stripe = new Stripe("sk_test_51JW0tcIjGDmG2UQfViGd7rcWR8FxrqAZLlj4BOh6MPkag7pIGxLqAAi0KoUw446WyFv5cM0LEuhw4Y1h210hyfqm00UO1p7kG7");

async function StripePayment (req, res){

   try {
      const reducerN = (previousValue, currentValue) => previousValue +' / '+ currentValue;
      const reducerP = (previousValue, currentValue) => previousValue + currentValue;
      var arrName = [];
      var arrPrice = [];
      var ResultName;
      var ResultPriceETH;
      var ResultPriceUS;

      console.log('req.body: ', req.body);

      for (let i = 0; i < req.body.purchaseOrder.length; i++) {
        
         const {name, price} = req.body.purchaseOrder[i];
         arrName.push(name);
         arrPrice.push(price);

      }
      ResultName = arrName.reduce(reducerN);
      ResultPriceETH = arrPrice.reduce(reducerP);   
      ResultPriceUS = ResultPriceETH*3629,53
      ResultPrice = (ResultPriceUS*10000)/100;
      console.log('ResultPrice: ', ResultPrice);

    const { id } = req.body
    const payment =  await stripe.paymentIntents.create({
         payment_method: id,
         amount: Math.round(ResultPrice),
         currency: "USD",
         description: ResultName,
         confirm: true,
    });

    res.json(payment);

 } catch (error){
    console.log(error);
    res.json({message: error});
 }

}

module.exports =  {StripePayment};