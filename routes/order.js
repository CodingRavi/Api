const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");
const Order = require("../model/Order");
const router = require("express").Router();

// Create Order
router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        const saveOrder = await newOrder.save()
        res.status(200).json(saveOrder)
    } catch (error) {
        res.send("Dublicate Order")
        // res.status(500).json(error)
    }
})

// Update
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true
            }
            );
            res.status(200).json(updatedOrder)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted....")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get User Order
router.get("/find/:userId",async(req,res)=>{
    try {
        const Orders = await Order.find({userId:req.params.userId});
        res.status(200).json(Orders)

    } catch (error) {
        res.status(500).json(error)
        
    }
})

// Get All
router.get("/",verifyTokenAndAdmin,async(re,res)=>{
    try {
       const Orders=await Order.find();
        res.status(200).json(Orders)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

// Get Monthly Income
router.get("/income",verifyTokenAndAdmin,async(req,res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(date.getMonth()+1));
    try {
        const income = await Order.aggregate([
            {$match:{createAt:{$gte:previousMonth}}},
            {
                $project:{
                    month:{$month:"$createAt"},
                    sales:"$amount",
                },
            },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum:"$sales"}
                    }
                },
        ]);
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router