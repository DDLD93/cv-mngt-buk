const LogModel = require("../model/log.model");
// const User = require("../model/");

const bcrypt = require("bcrypt")
const { jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");
// const {mailer, welcomeMsg} = require("../controller/mailer")

class LogController {
  constructor() { }

  async getLogs() {
    try {
      const logs = await LogModel.find();
      return { ok: true, data: logs };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async getUserLogin(userId) {
    try {
      const logs = await LogModel.find({ userId, type: { $in: ["login success", "login reject"] } });
      return { ok: true, data: logs };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async getUserDocument(userId) {
    try {
      const logs = await LogModel.find({
        userId, type: { $in: ["document pending","document accept", "document reject"] }
      });
      return { ok: true, data: logs };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async addLog(data) {
    try {
      const newLog = new LogModel(data);
      const log = await newLog.save();
      return { ok: true, data: log };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
}
module.exports = new UserController();