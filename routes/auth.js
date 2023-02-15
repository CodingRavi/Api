const router = require("express").Router();
const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

/**
 * @author Ravi Ranjan
 * @description will be used for thr registration of nthe user
 * @method post
 * @access public | user
 */
router.post("/register", async (req, res) => {
  const NewUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRETPASS
    ).toString(),
  });
  try {
    const saveUser = await NewUser.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

/**
 * @author Ravi Ranjan
 * @description will be used for the login  nthe user
 * @method post
 * 
 * @access public | user
 */

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(401).json("wrong credentials");

    const hashpassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRETPASS
    );
    const OriginalPassword = hashpassword.toString(CryptoJS.enc.Utf8);
    
    OriginalPassword !== req.body.password &&
      res.status(401).json("wrong credentials");

      const accessToken = jwt.sign(
        {
            id:user._id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_SEC,
        {
            expiresIn:"3d"
        }  
        )

    const { password, ...Other } = user._doc;

    res.status(200).json({...Other, accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
