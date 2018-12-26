# Ironhack-FinalProject
## Ecommerce-Store
## Link to Deployed Applicatioin on Heroku
[a link](https://tranquil-caverns-27579.herokuapp.com/)
### Admin credentials to see admin accessable routes 
mohsan@mail.com Password 12345678
started 3rd December 2018
Final submission date 14 Dec
### OVERVIEW & GOALS
This is a Men Suits selling application, which have various brands.
A suit can have various size different colors different materials and much more, In this
application we are going to give user full experience of search the product available on the store. User will be able to filter suits by price range by brands name, colors and size. main layout will be consist on a images slider, in other section we will be showing best selling products it will be filtering from database by  checking how many times the product been sold, there will be another section of new arrivals which also will be filtered from database. by the timestamp property of mongo, under each product we will be assigning a button which will open the product details route, and ofcourse add to cart button which will allow user to add product to buying list. at the end of this page will be footer.
there will be protected routes when user loging it will have different nav links, and ofcourse dashboard, dashboard will have user information.
then there will be Suits/ product route where will be showing our shop and all the filtering will be done we will use material UI for this , checkbox filtering this is the main part of this application.


- When the application loads we will get a navbar with the links of login or register, home, product and another section with slider images of product , Then there will be sections of
best selling products and new arrival which will be extracted from mongoDB.
- There will be an endpoint where we can search categories of product, we can do some
filtering with database.
- User want to buy the product they'll need to login or register. Authentication routes
- Login page will have ‘create an account’ for new customers, or user can login if user is
already a registered customer,
- User logged in he will have a dashboard with the user information and history of
purchases
- Logged user have access to cart my account or profile and logout definitely home and
product
- My cart page user can add and remove product to the cart . And it will show the total
amount as per product quantity and price.
- There will be payment method I will add paypal connecter to complete the transactions
- User will get access to Mycart, User information or Profile where he ll be able to update
information
- There will be an administrator endpoint where we ll be able to change some of the site
information, add new product including picture upload, and manage some of the product
categories.
#### SPECIFICATIONS
This is pretty big project with the client side and server side api, in client side basically will be
react.js, redux and some other liberaries, and server side will be including express.js, node.js and mongoDB, and of course some
libraries to assist with picture uploading, user authentication , password hashing, nodemailer, etc.
#### MILESTONES
#### Server Side
To get server up and running with functional API , there will be 5  models schemas, brand,
deatil, user, product,. And all the routes
#### Client Side
client side we will be using redux and lot of filtering to filter the products , we will be using material UI, font awesome, paypal connector for payment.
By Mohsan Abbas.
