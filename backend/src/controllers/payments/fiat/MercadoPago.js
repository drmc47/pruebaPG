const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'TEST-6367884903910990-091520-67b0488048e05fa4fefe823b7ca6d894-822690440'
  });

  async function MPayment (req, res){

    try {
      const reducerN = (previousValue, currentValue) => previousValue +' / '+ currentValue;
      const reducerP = (previousValue, currentValue) => previousValue + currentValue;
      var arrName = [];
      var arrPrice = [];
      var ResultName;
      var ResultPrice;


      for (let i = 0; i < req.body.length; i++) {
        
         const {name, price} = req.body[i];
         arrName.push(name);
         arrPrice.push(price);

      }
      ResultName = arrName.reduce(reducerN);
      ResultPrice = arrPrice.reduce(reducerP);
      console.log('ResultName back MercadoPago: ', ResultName);
      console.log('ResultPrice back MercadoPago: ', ResultPrice);
      //console.log('Req BODY Mercado Pago: ', req.body);

        let preference = {
            items: [
              {
                title: ResultName,
                unit_price: ResultPrice*338405,
                quantity: 1,
              }
            ],
            back_urls: {
              success: "http://localhost:3000",
              failure: "http://localhost:3000",
              pending: "http://localhost:3000"
          },
          auto_return: 'approved',
          };
    
       mercadopago.preferences.create(preference)
       .then((response) => {
        res.send(response.body.init_point)
       } )


    } catch (error){
        console.log(error);
        res.json({message: error});
     }

  }

module.exports =  {MPayment};