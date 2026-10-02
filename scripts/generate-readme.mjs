import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, '../content/home/index.md');
const readmePath = path.join(__dirname, '../README.md');

const fileContent = fs.readFileSync(indexPath, 'utf-8');
const { data } = matter(fileContent);

function mapList(items) {
  if (!items || !items.length) return '';
  return items.map(i => `- ${i.item}`).join('\n');
}

function mapNews(items) {
  if (!items || !items.length) return '';
  return items.map(i => `  <li>${i.item}<sup style="color: red; font-weight: bold; font-size: 11px;">NEW</sup></li>`).join('\n');
}

const readmeTemplate = `<div align="center">
  <img src="public/zz3.png" width="150" alt="${data.name}" style="border-radius: 50%; border: 2px solid #b30000; padding: 5px;" />
  <h1 style="color: #b30000; margin-bottom: 0;">${data.name}</h1>
  <p style="font-size: 18px; margin-top: 5px;"><b>${data.role}</b></p>
  <p>
    ${data.affiliation}<br>
    <b>E-mail:</b> ${data.email1} &nbsp;|&nbsp; ${data.email2} <br>
    <b>Phone:</b> ${data.phone}
  </p>
  <p>
    <a href="${data.googleScholar}">Google Scholar</a> &nbsp;&bull;&nbsp;
    <a href="${data.orcid}">ORCID</a>
  </p>
</div>

<hr style="border: 1px solid #e0e0e0;">

<ul style="list-style-type: disc;">
${mapNews(data.recentNews)}
</ul>

<hr style="border: 1px solid #e0e0e0;">

<table width="100%">
<tr>
<td width="50%" valign="top">

<h3 style="color: #b30000;">Area of Specialization :</h3>

${mapList(data.specialization)}

</td>
<td width="50%" valign="top">

<h3 style="color: #b30000;">Academic Education :</h3>

${mapList(data.education)}

</td>
</tr>
</table>

<table width="100%">
<tr>
<td width="50%" valign="top">

<h3 style="color: #b30000;">Experience & Administration :</h3>

${mapList(data.experience)}
${mapList(data.administrativeExperience)}

</td>
<td width="50%" valign="top">

<h3 style="color: #b30000;">Events & Workshops Organized :</h3>

${mapList(data.conferenceOrganized)}
${mapList(data.workshopOrganized)}
${mapList(data.eventOrganized)}

</td>
</tr>
</table>

<table width="100%">
<tr>
<td width="33%" valign="top">

<h3 style="color: #b30000;">Publication & Patents :</h3>

${mapList(data.publications)}
${mapList(data.patents)}

</td>
<td width="33%" valign="top">

<h3 style="color: #b30000;">Research Supervision :</h3>

${mapList(data.supervision)}

</td>
<td width="33%" valign="top">

<h3 style="color: #b30000;">Labs Established :</h3>

${mapList(data.labsEstablished)}

</td>
</tr>
</table>

---

<br>
<p align="center">
  <small>Developed by <a href="https://github.com/vikasingh0897">vikasingh0897</a></small>
</p>
`;

fs.writeFileSync(readmePath, readmeTemplate, 'utf-8');
console.log("README.md generated successfully!");
