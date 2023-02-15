const express =require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const cors  = require("cors")
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const ProductRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");
const StripeRoute = require("./routes/stripe");
const MailRoute = require("./routes/Mail");

dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(
    process.env.MONGO_URL
).then(()=>{
    console.log("connected to Database");
})
app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", ProductRoute)
app.use("/api/carts", CartRoute)
app.use("/api/orders", OrderRoute)
app.use("/api/checkout", StripeRoute)
app.use("/api/mail", MailRoute)

app.listen(process.env.PORT || 5000,()=>{
    console.log(`server is runing  on ${process.env.PORT}`);
})

