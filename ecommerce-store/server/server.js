require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const async = require('async');

const app = express();
mongoose.connect(
    process.env.DATABASE, {
      useNewUrlParser: true
    }
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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})
// Models
const User = require('./models/user');
const Brand = require('./models/brand');
const Detail = require('./models/details');
const Product = require('./models/product');
const Payment = require('./models/payment');
const Site = require('./models/site');


// middleware
const auth = require('./middleware/auth');
const admin = require('./middleware/admin')
// ---------
//  Products
// -------- 

app.post('/api/product/shop', (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        }

      } else {
        findArgs[key] = req.body.filters[key]
      }

    }
  }
  findArgs['publish'] = true;
  Product.find(findArgs).
  populate('brand').
  populate('detail').
  sort([
    [sortBy, order]
  ]).
  skip(skip).
  limit(limit).
  exec((err, articles) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      size: articles.length,
      articles
    })
  })

})


// search articles by Sell


// search articles by new arrival
// sortby created at note we have time stamp in database for each product we created 
app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find().
  populate('brand').
  populate('detail').
  sort([
    [sortBy, order]
  ]).
  limit(limit).
  exec((err, articles) => {
    if (err) return res.status(400).send(err);
    res.send(articles);

  })
})

// search articles 
app.get('/api/product/articles_by_id', (req, res) => {
  const type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(el => {
      return mongoose.Types.ObjectId(el);

    });
  };
  Product.find({
    '_id': {
      $in: items
    }
  }).
  populate('brand').
  populate('detail')
    .exec((err, docs) => {
      return res.status(200).send(docs)
    })
})
app.post('/api/product/article', auth, admin, (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save((err, doc) => {
    if (err) return res.json({
      success: false,
      err
    });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

//----------------
//   Suit's Detail 
//----------------
// admin and authorise users can add suit's details
app.post('/api/product/detail', auth, admin, (req, res) => {
  const suitDetail = new Detail(req.body);
  suitDetail.save((err, doc) => {
    if (err) return res.json({
      success: false,
      err
    });
    res.status(200).json({
      success: true,
      detail: doc,
    });
  });
});

app.get('/api/product/details', (req, res) => {
  Detail.find({}, (err, details) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(details);
  });
});

// ---------
//  Brands
// -------- 
// Admin or authorise user can Add new brands

app.post('/api/product/brand', auth, admin, (req, res) => {
  const newBrand = new Brand(req.body);
  newBrand.save((err, doc) => {
    if (err) return res.json({
      success: false,
      err
    });
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

// geting available brands

app.get('/api/product/brands', (req, res) => {
  Brand.find({}, (err, brands) => {
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
    name: req.user.name,
    lastname: req.user.lastname,
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
      userdata: doc,
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
          messsage: `Welcome ${user.name}`
        });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({
      _id: req.user._id
    }, {
      token: ''
    },
    (err, doc) => {
      if (err) return res.json({
        success: false,
        err
      });
      return res.status(200).send({
        success: true,
      })

    }
  )

})

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(req.files.file.path, (result) => {
    console.log(result);
    res.status(200).send({
      public_id: result.public_id,
      url: result.url
    })
  }, {
    public_id: `${Date.now()}`,
    resource_type: 'auto'
  })
})

app.get('/api/users/removeimage', auth, admin, (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({
      succes: false,
      error
    });
    res.status(200).send('ok');
  })
})

app.post('/api/users/addToCart', auth, (req, res) => {

  User.findOne({
    _id: req.user._id
  }, (err, doc) => {
    let duplicate = false;

    doc.cart.forEach((item) => {
      if (item.id == req.query.productId) {
        duplicate = true;
      }
    })

    if (duplicate) {
      User.findOneAndUpdate({
          _id: req.user._id,
          "cart.id": mongoose.Types.ObjectId(req.query.productId)
        }, {
          $inc: {
            "cart.$.quantity": 1
          }
        }, {
          new: true
        },
        () => {
          if (err) return res.json({
            success: false,
            err
          });
          res.status(200).json(doc.cart)
        }
      )
    } else {
      User.findOneAndUpdate({
          _id: req.user._id
        }, {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId),
              quantity: 1,
              date: Date.now()
            }
          }
        }, {
          new: true
        },
        (err, doc) => {
          if (err) return res.json({
            success: false,
            err
          });
          res.status(200).json(doc.cart)
        }
      )
    }
  })
})


app.get('/api/users/removeFromCart', auth, (req, res) => {

  User.findOneAndUpdate({
      _id: req.user._id
    }, {
      "$pull": {
        "cart": {
          "id": mongoose.Types.ObjectId(req.query._id)
        }
      }
    }, {
      new: true
    },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id)
      });

      Product.
      find({
        '_id': {
          $in: array
        }
      }).
      populate('brand').
      populate('detail').
      exec((err, cartDetail) => {
        return res.status(200).json({
          cartDetail,
          cart
        })
      })
    }
  );
})

app.post('/api/users/successBuy', auth, (req, res) => {
  let history = [];
  let transactionData = {}

  // user history
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID
    })
  })

  // PAYMENTS DASH
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  }
  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findOneAndUpdate({
      _id: req.user._id
    }, {
      $push: {
        history: history
      },
      $set: {
        cart: []
      }
    }, {
      new: true
    },
    (err, user) => {
      if (err) return res.json({
        success: false,
        err
      });

      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({
          success: false,
          err
        });
        let products = [];
        doc.product.forEach(item => {
          products.push({
            id: item.id,
            quantity: item.quantity
          })
        })

        async.eachSeries(products, (item, callback) => {
          Product.update({
              _id: item.id
            }, {
              $inc: {
                "sold": item.quantity
              }
            }, {
              new: false
            },
            callback
          )
        }, (err) => {
          if (err) return res.json({
            success: false,
            err
          })
          res.status(200).json({
            success: true,
            cart: user.cart,
            cartDetail: []
          })
        })
      });
    }
  )
})

app.post('/api/users/update_profile', auth, (req, res) => {

  User.findOneAndUpdate({
      _id: req.user._id
    }, {
      "$set": req.body
    }, {
      new: true
    },
    (err, doc) => {
      if (err) return res.json({
        success: false,
        err
      });
      return res.status(200).send({
        success: true
      })
    }
  );
})


// -----------------------
//          SITE
// -----------------------
app.get('/api/site/site_data', (req, res) => {
  Site.find({}, (err, site) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(site[0].siteInfo)
  });
});

app.post('/api/site/site_data',auth,admin,(req,res)=>{
  Site.findOneAndUpdate(
      { name: 'Site'},
      { "$set": { siteInfo: req.body }},
      { new: true },
      (err,doc )=>{
          if(err) return res.json({success:false,err});
          return res.status(200).send({
              success: true,
              siteInfo: doc.siteInfo
          })
      }
  )
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
})