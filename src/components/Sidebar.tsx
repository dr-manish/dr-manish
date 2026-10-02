import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MobileMenuToggle from './MobileMenuToggle';

export default async function Sidebar() {
  let data: any = {};
  try {
    const filePath = path.join(process.cwd(), 'content', 'home', 'index.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    data = matter(fileContents).data;
  } catch (error) {
    console.error("Error fetching Sidebar data:", error);
  }

  const cvUrl = data?.cvFile || "/cv.pdf";
  const email = data?.email1 || "khanagwal.manish@gmail.com";
  const googleScholar = data?.googleScholar || "https://scholar.google.com/citations?user=cnV7C-4AAAAJ&hl=en";
  const orcid = data?.orcid || "https://orcid.org/0000-0002-4827-6642";

  return (
    <MobileMenuToggle>
      <ul id="verticalmenu" className="glossymenu">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/short-bio">Short Bio</Link></li>
        <li><Link href="/personal-information">Personal Information</Link></li>
        <li><Link href="/qualifications">Qualifications</Link></li>
        <li><Link href="/publications">Publications</Link></li>
        <li><Link href="/experience">Experience</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/e-content">E-Content</Link></li>
      </ul>
      
      <div className="sidebar-bottom">
        <a href={cvUrl} target="_blank" className="download-btn">
          <span>📄</span> Complete CV (PDF)
        </a>
        
        <div className="quick-connect">
          <h4>Connect</h4>
          <div className="social-links">
            <a href={`mailto:${email}`}>
              <span className="social-icon">✉️</span> Email
            </a>
            <a href={googleScholar} target="_blank" rel="noreferrer">
              <span className="social-icon">🎓</span> Google Scholar
            </a>
            <a href={orcid} target="_blank" rel="noreferrer">
              <span className="social-icon">iD</span> ORCID
            </a>
          </div>
        </div>

      </div>
    </MobileMenuToggle>
  );
}
