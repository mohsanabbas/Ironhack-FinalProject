require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.connect(
  process.env.DATABASE,
  {useNewUrlParser: true}
  ).then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`,
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
// Models
const User = require('./models/user');
const Brand = require('./models/brand');
const Detail = require('./models/details');
const Product = require('./models/product');

// middleware
const auth = require('./middleware/auth');
const admin = require('./middleware/admin')
// ---------
//  Products
// -------- 
// search articles by Sell


// search articles by new arrival
// sortby created at note we have time stamp in database for each product we created 
app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order: 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy: '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find().
  populate('brand').
  populate('detail').
  sort([[sortBy,order]]).
  limit(limit).
  exec((err,articles) => {
    if (err) return res.status(400).send(err);
    res.send(articles);

  })
})

// search articles 
app.get('/api/product/articles_by_id',(req, res)=>{
const type = req.query.type;
let items = req.query.id;

if(type === "array"){
  let ids = req.query.id.split(',');
  items =[];
  items = ids.map(el=>{
    return mongoose.Types.ObjectId(el);

  });
};
Product.find({'_id':{ $in:items }}).
populate('brand').
populate('detail')
.exec((err,docs)=>{
  return res.status(200).send(docs)
})
})
app.post('/api/product/article',auth,admin,(req,res) =>{
  const newProduct = new Product(req.body);
  newProduct.save((err,doc)=>{
    if (err) return res.json({success: false, err });
    res.status(200).json({
      success:true,
      article: doc,
    });
  });
});

//----------------
//   Suit's Detail 
//----------------
// admin and authorise users can add suit's details
app.post('/api/product/detail',auth,admin,(req,res) =>{
  const suitDetail = new Detail(req.body);
  suitDetail.save((err,doc)=>{
    if (err) return res.json({success: false, err });
    res.status(200).json({
      success:true,
      detail: doc,
    });
  });
});

app.get('/api/product/details',(req, res) => {
  Detail.find({},(err,details)=>{
    if (err) return res.status(400).send(err);
    res.status(200).send(details);
});
});

// ---------
//  Brands
// -------- 
// Admin or authorise user can Add new brands

app.post('/api/product/brand',auth,admin,(req,res) => {
  const newBrand = new Brand(req.body);
  newBrand.save((err, doc) => {
    if (err) return res.json({success: false,err});
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

// geting available brands

app.get('/api/product/brands',(req, res) => {
  Brand.find({},(err,brands)=>{
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
});
});


// -----------------------
//          USERS
// -----------------------

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,

  });
});


app.post('/api/users/register', (req, res) => {
  const theUser = new User(req.body);

  theUser.save((err, doc) => {
    if (err) return res.json({
      success: false,
      err
    });
    res.status(200).json({
      success: true,
      // userdata: doc,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // find the email in database
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (!user) return res.json({
      loginSuccess: false,
      messsage: 'Authenticatioin failed, Email not found',
    });
    // refferencing function declared in user.js
    user.comparePassword(req.body.password, (err, isMatch) => {
      // find the password in database
      if (!isMatch) return res.json({
        loginSuccess: false,
        messsage: 'Wrong Password, Please enter again',
      });
      // genrate a token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          messsage: `Welcome ${user.firstName}`
        });
      });
    });
  });
});

app.get('/api/user/logout', auth,(req,res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: '' },
    (err, doc ) => {
      if(err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      })

    }
  )

})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
})