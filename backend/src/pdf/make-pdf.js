const _ = require('lodash');
const fs = require('fs');
const puppeteer = require('puppeteer');

module.exports = async (cv, filename, UPLOADS) => {
  try {
    const cvObj = normalizeData(cv);

    // Read the HTML template file
    const templateHtml = fs.readFileSync(__dirname + '/template.html', 'utf8');

    // Compile Handlebars template
    const template = _.template(templateHtml);

    // Generate HTML by passing the data to the compiled template
    const generatedHTML = template(cvObj);
    

    // Launch Puppeteer
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();

    // Set content to the page and create PDF
    await page.setContent(generatedHTML);
    await page.pdf({ path: `${UPLOADS}/${filename}`, format: 'Letter' });

    // Close browser
    await browser.close();

    return { ok: true, data: `uploads/${filename}` };
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
      organisation: mem.organization || '',
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
