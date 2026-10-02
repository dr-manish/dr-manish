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

function mapChecks(items) {
  if (!items || !items.length) return '';
  return items.map(i => `- ✅ ${i.item}`).join('\n');
}

function mapNews(items) {
  if (!items || !items.length) return '';
  return items.map(i => `- ✨ ${i.item.replace('NEW', '<sup>**NEW!**</sup>')}`).join('\n');
}

// Convert "Dr. MANISH KUMAR" to "Dr. Manish Kumar"
const formatName = data.name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
const formattedRole = data.role.replace(/ /g, '_');

// Parse dynamic badges
const firstSpec = (data.specialization && data.specialization[0]) ? data.specialization[0].item.split(' ').slice(0, 2).join('_') : 'Specialization';
const firstExp = (data.experience && data.experience[0]) ? data.experience[0].item : '';
const expMatch = firstExp.match(/^(\d+\+?)/);
const expBadgeText = expMatch ? `${expMatch[1]}_Years` : 'Experience';

// Parse dynamic affiliation parts
const affilParts = (data.affiliation || '').split(',').map(s => s.trim().replace(/\.$/, ''));
const deptName = affilParts[0] || 'Department';
const schoolName = affilParts[1] || 'School';
const uniName = affilParts[2] || 'University';

const readmeTemplate = `<div align="center">

# ${formatName}

> ${data.role} • ${data.affiliation.split(',').join(' •')}

</div>

<div align="center">

![Role](https://img.shields.io/badge/Role-${formattedRole}-007ACC?style=for-the-badge)
![Specialization](https://img.shields.io/badge/Specialization-${firstSpec}-2EA043?style=for-the-badge)
![Experience](https://img.shields.io/badge/Experience-${expBadgeText.replace(/\+/g, '%2B')}-D97917?style=for-the-badge)
[![Google Scholar](https://img.shields.io/badge/Google%20Scholar-4285F4?style=for-the-badge&logo=google-scholar&logoColor=white)](${data.googleScholar})
[![ORCID](https://img.shields.io/badge/ORCID-A6CE39?style=for-the-badge&logo=orcid&logoColor=white)](${data.orcid})

</div>

<br>

<table align="center">
  <tr>
    <td align="center" width="280">
      <img src="public${data.profilePhoto}" width="160" alt="${formatName}" style="border: 2px solid #007ACC; padding: 5px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0,0,0,0.2);"/>
    </td>
    <td width="550" valign="top">
      <h2>👤 Profile Overview</h2>
      <hr>
      <p><b>🗣️ Name:</b> ${formatName}</p>
      <p><b>💼 Position:</b> ${data.role}</p>
      <p><b>🏢 Department:</b> ${deptName.replace('Department of ', '')}</p>
      <p><b>🏫 Under:</b> ${schoolName}</p>
      <p><b>🏛️ University:</b> ${uniName}</p>
      <p><b>📧 Email:</b> ${data.email1}</p>
    </td>
  </tr>
</table>

---

## 📢 Latest Updates

${mapNews(data.recentNews)}

---

## 🎓 Academic Education

| Degree | Specialization | Institute / University |
| :--- | :--- | :--- |
${data.education ? data.education.map(e => {
  const parts = e.item.split(/[-–]/);
  if (parts.length >= 2) {
    const degree = parts[0].trim();
    const rest = parts.slice(1).join('-').split(',');
    const spec = rest[0].trim();
    const inst = rest.slice(1).join(',').trim();
    return `| **${degree}** | ${spec} | ${inst} |`;
  }
  return `| - | ${e.item} | - |`;
}).join('\n') : ''}

---

## 💡 Area of Specialization

${mapChecks(data.specialization)}

---

## 💼 Experience & Administration

### Academic Experience

${mapList(data.experience)}

### Administrative Roles

${mapList(data.administrativeExperience)}

---

## 📅 Events & Workshops Organized

${[
  ...(data.conferenceOrganized || []),
  ...(data.workshopOrganized || []),
  ...(data.eventOrganized || [])
].map(e => `- ${e.item}`).join('\n')}

---

## 📊 Impact & Contributions

### 📚 Publications & Patents

${data.publications ? data.publications.map(p => `- ${p.item}`).join('\n') : ''}
${data.patents ? data.patents.map(p => `- ${p.item}`).join('\n') : ''}

### 👨‍🎓 Research Supervision

${data.supervision ? data.supervision.map(s => `- ${s.item}`).join('\n') : ''}

### 🏗️ Labs Established

${mapList(data.labsEstablished)}

---

<div align="center">

_Designed & Developed with ❤️ by [vikasingh0897](https://github.com/vikasingh0897)_

</div>
`;

fs.writeFileSync(readmePath, readmeTemplate, 'utf-8');
console.log("README.md generated successfully!");
