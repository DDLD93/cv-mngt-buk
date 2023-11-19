const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logSchema = new Schema({
  userId: { type: String },
  type: { type: String, enum: ["login success", "login reject", "document pending", "document accept", "document reject"] },
  desc: { type: String },
  ipAddress: { type: String },
  logTime: { type: Date, default: Date.now() },
})

module.exports = mongoose.model("Log", logSchema);



