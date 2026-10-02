import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "E-Content",
};
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

export default async function EContentPage() {
  let documents: any[] = [];
  try {
    const econtentDir = path.join(process.cwd(), 'content', 'econtent');
    const filenames = fs.readdirSync(econtentDir);
    documents = filenames
      .filter((name) => name.endsWith('.md'))
      .map((name) => {
        const filePath = path.join(econtentDir, name);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const parsed = matter(fileContents);
        return { data: parsed.data, content: parsed.content };
      });
  } catch (error) {
    console.error("Error fetching e-content:", error);
    return <div>Error loading E-Content.</div>;
  }

  return (
    <div>
      <h2 className="page-title">E-Content</h2>
      {documents.map((doc: any, index: number) => (
        <div key={index} className="e-content-subject">
          <details name="econtent-accordion" style={{ marginBottom: '10px', cursor: 'pointer' }}>
            <summary style={{ outline: 'none' }}>
              <h3 className="e-content-title" style={{ display: 'inline-block', margin: '0 0 10px 0', pointerEvents: 'none' }}>{doc.data.title}</h3>
            </summary>
            
            <div style={{ paddingLeft: '15px', marginTop: '10px', cursor: 'default' }}>
              {doc.data.topics && doc.data.topics.length > 0 && (
                <div className="e-content-topics">
                  {doc.data.topics.map((topic: any, idx: number) => (
                    <div key={idx} className="e-content-topic-card">
                      <h4 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>{topic.topicName}</h4>
                      {topic.notes && <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>{topic.notes}</p>}
                      <div className="e-content-links">
                        {topic.pdf && (
                          <a href={topic.pdf} download target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#d93025' }}>
                            <span>📄</span> PDF Document (Download)
                          </a>
                        )}
                        {topic.link && (
                          <a href={topic.link} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#1a73e8' }}>
                            <span>🔗</span> External Link
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="tina-markdown">
                <ReactMarkdown>{doc.content}</ReactMarkdown>
              </div>
            </div>
          </details>
          
          {index < documents.length - 1 && <hr className="divider" />}
        </div>
      ))}
    </div>
  );
}
