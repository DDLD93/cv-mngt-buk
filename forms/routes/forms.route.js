const multer = require('multer');
const uuid = require('uuid').v4;
const FormCtrl = require("../controller/forms.controller")
const {Admin, Qa, Staff, PSP} = require("../middleware/auth.middleware")


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

  api.post("/",upload.single("file"), async (req, res) => {
    let body = JSON.parse(req.body.meta)
    let status = await FormCtrl.addForm(body, req.filePath)
    if (status.ok) {
      res.status(200).json(status.response);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.get("/", async (req, res) => {
    let status = await FormCtrl.getForms();
    if (status.ok) {
      if (status.Forms) return res.status(200).json(status.Forms);
      res.status(200).json([]);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.get("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await FormCtrl.getByUserID(id);
    console.log(status)
    if (status.ok) {
      if (status.form) return res.status(200).json(status.form);
      res.status(200).json({});
    } else {
      res.status(500).json(status.error);
    }
  });

  api.put("/reject/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now()
    delete body.createdAt;
    let status = await FormCtrl.updateForm(id, {status:"declined"})
    if (status.ok) {
      res.status(200).json(status.Form);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.put("/approve/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now()
    delete body.createdAt;
    let status = await FormCtrl.updateForm(id, {status:"approved"})
    if (status.ok) {
      res.status(200).json(status.Form);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.put("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now()
    delete body.createdAt;
    let status = await FormCtrl.updateForm(id, body)
    if (status.ok) {
      res.status(200).json(status.Form);
    } else {
      res.status(500).json(status.error);
    }
  });

  // Deleting One
  api.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let status = await FormCtrl.deleteForm(id)
    if (status.ok) {
      res.status(200).json(status.message);
    } else {
      res.status(500).json(status.error);
    }
  });

  return api;
}
