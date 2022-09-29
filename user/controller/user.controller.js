const User = require("../model/user.model");
// const {mailer, welcomeMsg} = require("../controller/mailer")
const uuid = require("uuid").v4

class UserController {
  constructor() { }

  async getUsers() {
    try {
      const users = await User.find();
      return { ok: true, payload: users, message: "users  fetched", error: null };
    } catch (err) {
      return { ok: false, payload: null, message: "unable to fetched users", error: err };
    }
  }

  async getCustom(userRole) {
    try {
      const users = await User.find({userRole});
      return { ok: true, payload: users, message: `${userRole} users fetched`, error: null };
    } catch (err) {
      return { ok: false, payload: null, message: `unable to fetch ${userRole} users`, error: err };
    }
  }

  async getUser(id) {
    try {
      const user = await User.findById(id);
      return { ok: true, payload: user, message: "user with id fetched", error: null };
    } catch (err) {
      return { ok: false, payload: null, message: "unable to get user", error: err };
    }
  }

  async addUser(data) {
    try {
      const newUser = new User(data);
      const user = await newUser.save();
      return { ok: true, payload: user, message: "user added", error: null };
    } catch (err) {
      return { ok: false, payload: null, message: "unable to add user", error: err };
    }
  }

  async registerUser(data) {
    try {
      const newUser = new User(data);
      const password = uuid().split("-")[0]
      newUser.password = password
      const user = await newUser.save();
      // let response = await welcomeMsg(user.email,user.fullName,user.password,'abedmis.fmhds.gov.ng')
      return { ok: true, user };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async updateUser(id, newData) {
    try {
      const user = await User.findByIdAndUpdate(id, newData, { multi: false, new: true });
      return { ok: true, payload: user, message: "user with id updated", error: null };
    } catch (err) {
      return { ok: false, payload: null, message: "unable to update user", error: err };
    }
  }
  async deleteUser(id) {
    try {
      await User.findByIdAndDelete(id);
      return { ok: true, payload: null, message: "user with id deleted", error: null };
    } catch (err) {
      return { ok: false, payload: null, message: "unable to delete user", error: err };
    }
  }
}
module.exports = new UserController();