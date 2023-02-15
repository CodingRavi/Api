const Product = require("../model/Product");

const searchProducts = async(req,res)=>{
    const word  = req.params.key
    const products = await Product.find({
        $or: [
          { title: { $regex: word, $options: "i" } },
          { desc: { $regex: word, $options: "i" } }
        ]
      });
    
      res.status(200).json(products);
}

module.exports = searchProducts;