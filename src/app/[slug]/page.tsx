import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { title: data.title || "Page" };
  } catch {
    return { title: "Page Not Found" };
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let data: any = {};
  let content = "";
  try {
    const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContents);
    data = parsed.data;
    content = parsed.content;
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error);
    return <div>Page not found.</div>;
  }

  return (
    <div>
      <h2 className="page-title">{data.title}</h2>
      
      {data.pdfFile && (
        <div style={{ marginBottom: '20px' }}>
          <iframe 
            src={data.pdfFile} 
            width="100%" 
            height="800px" 
            style={{ border: 'none', borderRadius: '4px', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}
            title={`${data.title} Document`}
          />
        </div>
      )}

      <div className="tina-markdown">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const pagesDir = path.join(process.cwd(), 'content', 'pages');
    if (!fs.existsSync(pagesDir)) return [];
    const filenames = fs.readdirSync(pagesDir);
    return filenames
      .filter((name) => name.endsWith('.md'))
      .map((name) => ({
        slug: name.replace(/\.md$/, ''),
      }));
  } catch {
    return [];
  }
}
