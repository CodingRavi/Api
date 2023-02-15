const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../model/Cart");
const router = require("express").Router();



// Create Cart
router.post("/",verifyToken,async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
        const saveCart = await newCart.save()
        res.status(200).json(saveCart)
    } catch (error) {
        res.send("Dublicate Cart")
        // res.status(500).json(error)
    }
})

// Update
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true
            }
            );
            res.status(200).json(updatedCart)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted....")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get User Cart
router.get("/find/:userId",async(req,res)=>{
    try {
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json(error)
        
    }
})

// Get All
router.get("/",verifyTokenAndAdmin,async(re,res)=>{
    try {
       const Carts=await Cart.find();
        res.status(200).json(Carts)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router