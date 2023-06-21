const { Router } = require('express')
const Roles = require('../../src/models/Role')
const router = Router()
const cors = require('cors')
const passport = require('passport')

const {
  transactionMetaMask,
} = require('../controllers/payments/crypto/transactionMetaMask')
const { StripePayment } = require('../controllers/payments/fiat/Stripe')
const { MPayment } = require('../controllers/payments/fiat/MercadoPago')
const { createOrder, getOrder } = require('../controllers/products/orders')
const { createProfile, getProfile } = require('../controllers/users/user')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../controllers/middlewares/verifyToken')
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
// PRUEBA NODEMAILER
const transporter = require('../libs/nodemailer')
const signupMail = require('../libs/signupMail')
const verifyAdmin = require('../controllers/middlewares/verifyAdmin');



//ADMIN
const {
  getUsers,
  updateAdminById,
  deleteUser,
  getUserById,
  getUsersDb,
} = require('../controllers/Admin/admin')
//ROUTES ADMIN

router.get('/admin/verify', verifyAdmin)
router.get('/admin/users', getUsersDb)
router.get('/user/:id', getUserById)
router.put('/admin/edit/:username', updateAdminById)
router.delete('/deleteUser/:id', deleteUser)


//CATEGORIES
const {
  createCategorie,
  updateCategorieById,
  deleteCategorieById,
  getCategories,
} = require("../controllers/products/categorie");
//ROUTES CATEGORIES
router.get("/categories", getCategories);
router.post("/create/categorie", createCategorie);
router.put("/edit/categorie/:id", updateCategorieById);
router.delete("/categorie/:id", deleteCategorieById);

//PRODUCTS
const {
  searchProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getNFTs,
} = require('../controllers/products/products')
// const verifyAdmin = require('../controllers/middlewares/verifyAdmin')

// ROUTES PRODUCTS
router.get('/search', searchProduct)
router.get('/nfts', getNFTs)
router.get('/nft/:id', getProductById)
router.get('/orderCart', getOrder)
router.post('/nft', createProduct)
router.post('/orderCart', createOrder)
router.post('/transactionMetamask', transactionMetaMask)
router.post('/transactionStripe', StripePayment)
router.post('/MercadoPagoTransaction', MPayment)
router.put('/edit/:id', updateProductById)

//ROUTES PROFILE
router.get("/profile", getProfile);
router.post("/profile", createProfile);


router.delete("/admin/:id", deleteProductById); // RUTA DEL ADMIN
router.post(
  "/admin/create",
  passport.authenticate("local-signup", {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {

    const found = user.roles.find((e) => e == '613bd8b725b8702ce89f7474')
    res.json(req.user)
    //res.redirect(AL JOM DEL PROYECTO)
  }
);

router.delete("/delete/:id", deleteProductById);

//REGISTRO LOCAL
router.post(
  "/register",
  passport.authenticate("local-signup", {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),

  async (req, res, _next) => {
    transporter.sendMail(signupMail(req), function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
        res.send('Todo ok en el envío de mails de nodemailer')
      }
    })
    return res.send(req.user)

    //res.redirect(AL JOM DEL PROYECTO)
  }
);

//INICIO DE SESION LOCAL

router.post(
  "/login",
  passport.authenticate("local-login", {
    // successRedirect : 'https://localhost:3000/',
    // failureRedirect: 'https://localhost:3000/login',
    passReqToCallback: true,
  }),
  async (req, res, next) => {
    try {
      if (req.error || !req.user) {
        const error = new Error("new Error");
        return next(error);
      }
      req.login(req.user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: req.user.id, username: req.user.username }
        const token = jwt.sign({ user: body }, 'superstringinhackeable')
        const filter = { username: req.body.username }
        const userFound = await User.findOne({
          username: req.body.username,
        }).populate('roles')        
        const userCart=await User.findOne({username:req.body.username})
        if (req.body.cart){
           userCart.shoppingCart=userCart.shoppingCart.concat(req.body.cart)
           function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
           }       
           let filter=userCart.shoppingCart.filter(onlyUnique )
           console.log(filter)
           userCart.shoppingCart=filter
           userCart.save()
        }
        const update = { token: token }
        
        const cart=userCart.shoppingCart
        
        const role = userFound.roles[0].name
        const resp = await User.findOneAndUpdate(filter, update, { new: true })

        res.cookie('token', resp.token);
        // return res.send([resp,role,cart])
        res.cookie('role', role);
        // res.cookie('cart', cart);
        // console.log('CART => ', cart)
        return res.sendStatus(200)
      })

    } catch (error) {
      return next(error);
    }
  }
);


router.post('/logout', async (req, res,next) => {
  try{
    const token = Object.keys(req.body)[0];
    const filter = {token}
    const update = {token:null}
    await User.findOneAndUpdate(filter, update, { new: true })
    res.send('LOGGED OUT')
  }catch(error){
    next(error)
  }
})

//INICIO DE SESION CON GOOGLE
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/rutadeerror",
    // successRedirect: 'http://localhost:3000/',
    passReqToCallback: true,
  }),
  async (req, res) => {
   // res.send(req.user);
  //  console.log(req.user)
   const userFound = await User.findOne({
     username: req.user.username,
   }).populate('roles')
   const role = userFound.roles[0].name
   res.cookie('token' ,req.user.token);
   res.cookie('role', role)
  //  return res.send(req.user.role)
   return res.redirect('http://localhost:3000/')
  }
);

//PRUEBAS
router.get("/prueba", verifyAdmin);

router.use(cors(corsOptions));

//SHOPPING CART USER LOGGED
const {shoppingCartDB} = require('../controllers/shoppingCart/shoppingCartDB')
const {getCart}=require("../controllers/shoppingCart/getCart")
const {deleteCart}=require ('../controllers/shoppingCart/deleteCart')
router.post("/userShoppingCart", shoppingCartDB);
router.post("/DBShoppingCart",getCart);
router.post('/deleteItem',deleteCart)


module.exports = router;
