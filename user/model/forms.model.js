const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Education = new Schema({
  institution: { type: String, required: true },
  qualification: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
})
const Employment = new Schema({
  organisation: { type: String, required: true },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
})
const Membership = new Schema({
  organisation: { type: String, required: true },
  title: { type: String, required: true },
  start: { type: Date, required: true },
})
const AdditionalInfo = new Schema({
  category: { type: String, required: true },
  information: { type: String, required: true },
  filePath: { type: String },
  date: { type: Date, required: true },
})
const Skills = new Schema({
  skill: { type: String, required: true },
})

const formSchema = new Schema({
  userId: { type: String, },
  status: { type: String, enum: ["not submitted", "incompleted", "pending", "approved", "declined"], default: "not submitted" },
  staffAdmin: { type: String, },
  filePath: { type: String, },
  personalInfo: {
    firstName: { type: String},
    lastName: { type: String },
    otherName: { type: String},
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    statement: { type: String },
  },
  education: [Education],
  employment: [Employment],
  membership: [Membership],
  additionalInfo: [AdditionalInfo],
  skills: { type: [Skills], },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
})
module.exports = mongoose.model("Form", formSchema);



