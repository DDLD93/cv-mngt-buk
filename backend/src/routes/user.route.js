const multer = require('multer');
const uuid = require('uuid').v4;
const userCtrl = require("../controller/user.controller")
const User = require("../model/user.model")
const jwt = require("jsonwebtoken");
const { Admin, Qa, Staff, PSP } = require("../middleware/auth.middleware");
const config = require('../config');


module.exports = (express, UPLOADS) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fPath = UPLOADS;
      cb(null, fPath);
    },
    filename: function (req, file, cb) {
      const arr = file.originalname.split('.');
      const ext = arr[arr.length - 1];
      const fileUrl = `${uuid().replace(/-/g, '')}.${ext}`;
      req.filePath = './uploads/' + fileUrl;
      cb(null, fileUrl);
    }
  });

  const upload = multer({ storage });
  api = express.Router();

  api.post("/", async (req, res) => {
    let data = req.body
    const status = await userCtrl.addUser(data)
    if (status.ok) {
      return res.status(201).json(status);
    } else {
      res.status(500).json(status);
    }
  });
  api.post("/register", async (req, res) => {
    let data = req.body
    const status = await userCtrl.registerUser(data)
    if (status.ok) {
      return res.status(201).json(status);
    } else {
      res.status(500).json(status);
    }
  });

  api.get("/", async (req, res) => {
    let status = await userCtrl.getUsers();
    if (status.ok) {
      if (status) return res.status(200).json(status);
      res.status(200).json([]);
    } else {
      res.status(500).json(status);
    }
  });
  api.get("/:userRole", async (req, res) => {
    let { userRole } = req.params
    let status = await userCtrl.getCustom(userRole);
    if (status.ok) {
      if (status) return res.status(200).json(status);
      res.status(200).json([]);
    } else {
      res.status(500).json(status);
    }
  });

  api.get("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await userCtrl.getUser(id);
    if (status.ok) {
      if (status) return res.status(200).json(status);
      res.status(200).json({});
    } else {
      res.status(500).json(status);
    }
  });

  api.patch("/status/:id", async (req, res) => {
    let { id } = req.params;
    let data = req.body
    let status = await userCtrl.updateUserstatus(id, data.status);
    if (status.ok) {
      if (status) return res.status(200).json(status);
      res.status(200).json({});
    } else {
      res.status(500).json(status);
    }
  });

  api.post("/login", async (req, res) => {
    let body = req.body
    let { ok, data, message } = await userCtrl.login(body)
    console.log({ ok, data, message })
    if (!ok) {
      res.status(400).json({ ok, message });
    } else {
      res.status(200).json({ ok, data });
    }
  });

  api.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    delete body.createdAt;
    let status = await userCtrl.updateUser(id, body)
    if (status.ok) {
      res.status(200).json(status);
    } else {
      res.status(500).json(status);
    }
  });

  // Deleting One
  api.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await userCtrl.deleteUser(id)
    if (status.ok) {
      res.status(200).json(status);
    } else {
      res.status(500).json(status);
    }
  });

  return api;
}
