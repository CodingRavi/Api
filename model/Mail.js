const mongoose = require("mongoose");
const validator = require("validator")
const MailSchema = new mongoose.Schema(
  {
   mail: { type: String ,required: [true , "enter mail first"] },
},
  { timestamps: true,}
);

module.exports = mongoose.model("Mail",MailSchema);
