const Form = require("../model/forms.model");
// const {mailer, welcomeMsg} = require("../controller/mailer")
const uuid = require("uuid").v4

class FormController {
  constructor() { }

  async getForms() {
    try {
      const Forms = await Form.find();
      return { ok: true, Forms };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async getForm(id) {
    try {
      const form = await Form.findById(id);
      return { ok: true, form };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async getByUserID(id) {
    try {
      const form = await Form.findOne({ userId: id });
      return { ok: true, form };
    } catch (err) {
      return { ok: false, error: err.message };
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
      const response = await newForm.save();
      return { ok: true, response };
    } catch (err) {
      return { ok: false, error: err };
    }
  }
  async addPesonalForm(data) {
    try {
      const newForm = new Form(data);
      const response = await newForm.save();
      return { ok: true, response };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  async updateForm(id, newData) {
    try {
      const updatedForm = await Form.findOneAndUpdate({ userId: id }, newData, { multi: false, new: true })
      return { ok: true, form: updatedForm };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  async deleteForm(id) {
    try {
      await Form.findByIdAndDelete(id);
      return { ok: true, message: "Deleted Form" };
    } catch (err) {
      return { ok: false, error: err };
    }
  }
}
module.exports = new FormController();