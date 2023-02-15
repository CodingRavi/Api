const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config()
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment",(req,res)=>{

    console.log(":: token request :: ", req.body.tokenId.id);
    console.log(":: req.body.amount :: ",req.body.amount);

    stripe.charges.create({
        source:req.body.tokenId.id,
        amount:req.body.amount,
        currency:"usd",
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            console.log(":: stripeErr :: ",stripeErr);
            res.status(500).json(stripeErr)
        }else{
            console.log(":: stripeRes :: ",stripeRes);
            res.status(200).json(stripeRes)
        }
    }
    );
});
module.exports = router;
