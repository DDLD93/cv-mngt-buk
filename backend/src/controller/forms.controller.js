const Form = require("../model/forms.model");
// const {mailer, welcomeMsg} = require("../controller/mailer")
const uuid = require("uuid").v4

class FormController {
  constructor() { }

  async getForms() {
    try {
      const forms = await Form.find();
      return { ok: true, data: forms };
    } catch (err) {
      return { ok: false, message: err };
    }
  }

  async getForm(id) {
    try {
      const form = await Form.findById(id);
      return { ok: true, data: form };
    } catch (err) {
      return { ok: false, message: err };
    }
  }

  async getByUserID(id) {
    try {
      const form = await Form.findOne({ userId: id });
      return { ok: true, data: form };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  // async addForm(data,formPath) {
  //   try {
  //     const newForm = new Form(data);
  //     newForm.filePath = formPath
  //     const response = await newForm.save();
  //     return { ok: true, response};
  //   } catch (err) {
  //     return { ok: false, error: err };
  //   }
  // }

  async addForm(id, formPath) {
    try {
      const newForm = new Form({ userId: id, status: "pending" });
      newForm.filePath = formPath
      const form = await newForm.save();
      return { ok: true, data: form };
    } catch (err) {
      return { ok: false, message: err };
    }
  }
  async addPesonalForm(data) {
    try {
      const newForm = new Form(data);
      const response = await newForm.save();
      return { ok: true, data: response };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async updateForm(id, newData) {
    try {
      const form = await Form.findOneAndUpdate({ userId: id }, newData, { multi: false, new: true })
      if (!form) {
        return { ok: false, message: "user record not found" };
      }
      return { ok: true, data: form };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }

  async deleteForm(id) {
    try {
      await Form.findByIdAndDelete(id);
      return { ok: true, message: "Deleted Form" };
    } catch (err) {
      return { ok: false, message: err.message };
    }
  }
}
module.exports = new FormController();