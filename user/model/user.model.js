const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffAdmin = new Schema({
  id:{type: String,},
  firstName: { type: String},
  lastName: { type: String,},
  otherName: { type: String },
  fullName: { type: String},
  phone: { type: String},
  email: { type: String},
})
const userSchema = new Schema({
  firstName: { type: String, index: true, },
  lastName: { type: String, index: true, },
  otherName: { type: String, index: true, },
  fullName: { type: String, required: true, index: true, },
  phone: { type: String, required: true, index: true, unique: true, dropDups: true },
  email: { type: String, required: true, index: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true, enum: ["admin", "staff", "staff admin"]},
  formStatus: { type: String, enum: ["not submitted", "incompleted", "submitted", "approved", "declined"], default: "not submitted" },
  staffAdmin: staffAdmin,
  faculty: { type: String,},
  department : { type: String,},
  status: { type: String, enum: ["active", "suspended", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
})

module.exports = mongoose.model("User", userSchema);



