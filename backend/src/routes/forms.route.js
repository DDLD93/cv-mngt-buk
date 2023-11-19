const multer = require('multer');
const uuid = require('uuid').v4;
const FormCtrl = require("../controller/forms.controller");
const UserCtrl = require("../controller/user.controller");
const makePDF = require("../pdf/make-pdf");
const { Admin, Qa, Staff, PSP } = require("../middleware/auth.middleware")


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

  api.post("/upload", upload.single("file"), async (req, res) => {
    let id = req.body.userId
    let status = await FormCtrl.addForm(id, req.filePath)
    if (status.ok) {
      let { ok, message, data } = await UserCtrl.updateUserstatus(id, "submitted")
      res.status(200).json({ ok, message, data });
    } else {
      res.status(500).json(status);
    }
  });
  api.post("/", async (req, res) => {
    let body = JSON.parse(req.body)
    let status = await FormCtrl.addForm(body)
    if (status.ok) {
      res.status(200).json(status.response);
    } else {
      res.status(500).json(status.error);
    }
  });

  api.post("/personal", async (req, res) => {
    let body = req.body
    let status = await FormCtrl.addPesonalForm(body)
    if (status.ok) {
      res.status(200).json(status);
    } else {
      res.status(500).json(status);
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
    if (status.ok) {
      res.status(200).json(status);
    } else {
      res.status(500).json(status);
    }
  });

  api.put("/reset/:id", async (req, res) => {
    let { id } = req.params;
    let status = await FormCtrl.updateForm(id, { status: "not submitted" })
    if (status.ok) {
      let status = await UserCtrl.updateForm(id, { formStatus: "not submitted" })
      if (status.ok) {
        res.status(200).json(status);
      } else {
        res.status(500).json(status);
      }
    } else {
      res.status(500).json(status);
    }
  })

  api.put("/reject/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now()
    delete body.createdAt;
    let status = await FormCtrl.updateForm(id, { status: "declined" })
    if (status.ok) {
      let status = await UserCtrl.updateUser(id, { formStatus: "declined" })
      if (status.ok) {
        res.status(200).json(status);
      } else {
        res.status(500).json(status);
      }
    } else {
      res.status(500).json(status);
    }
  });

  api.put("/approve/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now()
    delete body.createdAt;
    let status = await FormCtrl.updateForm(id, { status: "approved" })
    if (status.ok) {
      let status = await UserCtrl.updateUser(id, { formStatus: "approved" })
      if (status.ok) {
        res.status(200).json(status);
      } else {
        res.status(500).json(status);
      }
    } else {
      res.status(500).json(status);
    }
  });

  api.put("/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now();
    delete body.createdAt;
    let status = await FormCtrl.updateForm(id, body);
    if (status.ok) {
      res.status(200).json(status);
    } else {
      res.status(500).json(status);
    }
  });

  api.put("/submit/:id", async (req, res) => {
    let { id } = req.params;
    let body = req.body;
    body.updatedAt = Date.now();
    body.status = "pending"
    delete body.createdAt;
    const filename = `${uuid().replace(/-/g, '')}.pdf`;
    body.filePath = "uploads/"+filename;
    let promiseArr = [
      FormCtrl.updateForm(id, body),
      UserCtrl.updateUserstatus(id, "pending")
    ]
    let response = await Promise.all(promiseArr)
    let formData = response[0].data
    // console.log({ response })
    let { ok, message } = await makePDF(formData, filename, UPLOADS)
    if (ok) {
      res.status(200).json({ ok: true, data: response[1].data });
    } else {
      res.status(500).json({ ok: false,message });
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
