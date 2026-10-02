"use client";

import React, { useState } from 'react';

export default function MobileMenuToggle({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        {isOpen ? '✕ Close Menu' : '☰ Menu'}
      </button>
      <div id="sidebar" className={isOpen ? 'sidebar-open' : ''}>
        {children}
      </div>
    </>
  );
}
