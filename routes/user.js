const router = require("express").Router();
const User = require("../model/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

router.get("/update",async(req,res)=>{
    res.send("updated")
})

/**
 * @author Ravi Ranjan
 * @description will be used for update user user
 * @method put
 * @access Authorized | user
 */
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRETPASS
    ).toString();
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    );
    res.status(200).json(updateUser)
  } catch (error) {
      res.status(500).json(error)
  }
});

/**
 * @author Ravi Ranjan
 * @description will be used for delete user user
 * @method delete
 * @access Authorized | user
 */
router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted....")
  } catch (error) {
    res.status(500).json(error)
    
  }
})

/**
 * @author Ravi Ranjan
 * @description get user
 * @method get
 * @access Authorized | user
 */
 router.get("/:id",verifyTokenAndAdmin,async(req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    const { password, ...Other } = user._doc;
    res.status(200).json(Other);
  } catch (error) {
    res.status(500).json(error)
    
  }
})

/**
 * @author Ravi Ranjan
 * @description get user
 * @method get
 * @access Authorized | user
 */
 router.get("/",verifyTokenAndAdmin,async(req,res)=>{
   const query = req.query.new;
  try {
    const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error)
    
  }
})

/**
 * @author Ravi Ranjan
 * @description get user state
 * @method get
 * @access Authorized | user
 */
router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
  try {
    const data = await User.aggregate([
      {$match: {createAt : {$gte:lastYear}}},
      {$project:{
        month:{$month:"$createAt"},
      },
    },
    {
      $group:{
        _id:"$month",
        total:{$sum:1},
      },
    },
    ]);
    res.status(200).json(data)
  } catch (error) {
    res.status(501).json(error)
  }
})

module.exports = router;
