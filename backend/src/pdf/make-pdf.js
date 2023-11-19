const fs = require('fs');
const _ = require('lodash');
const pdf = require('html-pdf');

module.exports = async (cv, filename, UPLOADS) => {
  try {
    const cvObj = normalizeData(cv);

    // Read the HTML template file
    const template = fs.readFileSync(__dirname + '/template.html', 'utf8');

    // Compile lodash template
    const compiledTemplate = _.template(template);

    // Generate HTML by passing the data to the compiled template
    const generatedHTML = compiledTemplate(cvObj);

    // HTML to PDF conversion options
    const options = { format: 'Letter' };

    // Convert HTML to PDF

    return await new Promise((resolve, reject) => {
      pdf.create(generatedHTML, options).toFile(`${UPLOADS}/${filename}`, (err, res) => {
        console.log(res)
        if (err) {
          reject({ ok: false, message: err.message });
        } else {
          resolve({ ok: true, data: "uploads/" + filename });
        }
      });
    });
  } catch (err) {
    return { ok: false, message: err.message };
  }
};

function normalizeData(data) {
  const normalizedData = {
    personalInfo: {
      fullName: `${data.personalInfo.firstName} ${data.personalInfo.lastName} ${data.personalInfo.otherName}` || "",
      email: data.personalInfo.email || '',
      phone: data.personalInfo.phone || '',
      address: data.personalInfo.address || '',
      statement: data.personalInfo.statement || '',
    },
    education: data.education.map(edu => ({
      institution: edu.institution || '',
      qualification: edu.qualification || '',
      start: edu.start ? new Date(edu.start).toLocaleDateString() : null,
      end: edu.end ? new Date(edu.end).toLocaleDateString() : null,
    })),
    employment: data.employment.map(job => ({
      organisation: job.organisation || '',
      title: job.title || '',
      start: job.start ? new Date(job.start).toLocaleDateString() : null,
      end: job.end ? new Date(job.end).toLocaleDateString() : null,
    })),
    membership: data.membership.map(mem => ({
      organisation: mem.organisation || '',
      title: mem.title || '',
      start: mem.start ? new Date(mem.start).toLocaleDateString() : null,
    })),
    additionalInfo: data.additionalInfo.map(info => ({
      category: info.category || '',
      information: info.information || '',
      filePath: info.filePath || '',
      date: info.date ? new Date(info.date).toLocaleDateString() : null,
    })),
    skills: Array.isArray(data.skills) ? data.skills : data.skills.split(',').map(skill => skill.trim()),
  };

  return normalizedData;
}
