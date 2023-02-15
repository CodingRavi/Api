const { verifyToken, verifyTokenAndAdmin} = require("./verifyToken");
const Mail = require("../model/Mail");
const SendMail = require("../controller/SendMail");
const router = require("express").Router();



// Create Mail
router.post("/add",async(req,res)=>{
    const mails = await Mail.findOne(mail= req.body);
    if(mails){
        res.status(201).json("mail alredy have")
        
    }
    else{

        const newMail = new Mail(req.body);
        try{
            const saveMail = await newMail.save()
            res.status(200).json(saveMail)
        } catch (error) {
            res.send("Error Mail")
            // res.status(500).json(error)
        }
    }
})


router.post("/send",SendMail);

module.exports = router