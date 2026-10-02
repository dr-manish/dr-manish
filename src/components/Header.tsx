import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default async function Header() {
  let data: any = {};
  try {
    const filePath = path.join(process.cwd(), 'content', 'home', 'index.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = matter(fileContents).data;
  } catch (error) {
    console.error("Error fetching header data:", error);
  }

  // Fallbacks if data fails to load
  const name = data?.name || "Dr. Manish Kumar";
  const role = data?.role || "Assistant Professor";
  const affiliation = data?.affiliation || "School of Engineering and Technology, Central University of Haryana";
  const email1 = data?.email1 || "khanagwal.manish@gmail.com";
  const email2 = data?.email2 || "manish.kumar@cuh.ac.in";
  const phone = data?.phone || "+91-9255140623";
  const logoUrl = data?.logo || "/cuh-logo.png";
  const profileUrl = data?.profilePhoto || "/profile-img.jpg";

  return (
    <div id="header">
      <div id="logo">
        <img src={logoUrl} alt="Logo" />
      </div>
      <div id="header-title">
        <h1>{name}</h1>
        <h2>{role}</h2>
        <div>
          <strong>{affiliation}</strong>
        </div>
        <div className="contact-info">
          <span className="contact-item"><strong>E-mail: </strong> <a href={`mailto:${email1}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{email1}</a></span>
          <span className="separator">&nbsp;|&nbsp;</span>
          {email2 && (
            <>
              <span className="contact-item"><a href={`mailto:${email2}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{email2}</a></span>
              <span className="separator">&nbsp;|&nbsp;</span>
            </>
          )}
          <span className="contact-item"><strong>Phone:</strong> <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>{phone}</a></span>
        </div>
      </div>
      <div id="myphoto">
        <img src={profileUrl} alt="Profile" />
      </div>
    </div>
  );
}
