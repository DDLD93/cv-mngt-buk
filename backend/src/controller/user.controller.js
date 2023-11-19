const User = require("../model/user.model");
// const User = require("../model/");

const bcrypt = require("bcrypt")
const { jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");
// const {mailer, welcomeMsg} = require("../controller/mailer")

class UserController {
  constructor() { }
  async login(body) {
    try {
      const user = await User.findOne({ email: body.email });
      if (!user) return { ok: false, message: "invalid email or password" }
      let isPassMatch = await bcrypt.compare(body.password, user.password)
      if (!isPassMatch) return { ok: false, message: "Invalid password" };
      const token = jwt.sign({
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        staffAdmin: user.staffAdmin
      }, jwtSecret, { expiresIn: '24h' })
      return { ok: true, data: { user, token } }
    } catch (err) {
      return { ok: false, message: err.message }
    }

  }
  async getUsers() {
    try {
      const users = await User.find();
      return { ok: true, data: users };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async getCustom(userRole) {
    try {
      const users = await User.find({ userRole });
      return { ok: true, data: users };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async getUser(id) {
    try {
      const user = await User.findById(id);
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, payload: null, message: err.mesage };
    }
  }

  async addUser(data) {
    try {
      const newUser = new User(data);
      const user = await newUser.save();
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async registerUser(data) {
    try {
      data.password = "123456" // remove this
      data.password = await bcrypt.hash(data.password, 10)
      const newUser = new User(data);
      const user = await newUser.save();


      //s
      // let response = await welcomeMsg(user.email,user.fullName,user.password,'abedmis.fmhds.gov.ng')
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  async updateUser(id, newData) {
    try {
      const user = await User.findByIdAndUpdate(id, newData, { multi: false, new: true });
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, data: null };
    }
  }
  async updateUserstatus(id, status) {
    try {
      const user = await User.findByIdAndUpdate(id, { status, formStatus: status }, { multi: false, new: true });
      console.log({user,id})
      return { ok: true, data: user };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
  async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);
      return { ok: true, data: null, };
    } catch (err) {
      return { ok: false, message: err.mesage };
    }
  }
}
module.exports = new UserController();