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
      const form = await Form.findOne({userId:id});
      return { ok: true, form };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async addForm(data,formPath) {
    try {
      const newForm = new Form(data);
      newForm.filePath = formPath
      const response = await newForm.save();
      return { ok: true, response};
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async updateForm(id, newData) {
    console.log(newData)
    try {
      const updatedForm = await Form.findOneAndUpdate({userId:id},newData,{multi:false, new:true})
      console.log(updatedForm)
      return { ok: true, Form: updatedForm };
    } catch (err) {
      return { ok: false, error: err };
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