"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function MobileMenuToggle({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu whenever the user navigates to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        style={{ cursor: 'pointer' }}
      >
        {isOpen ? '✕ Close Menu' : '☰ Menu'}
      </button>
      <div id="sidebar" className={isOpen ? 'sidebar-open' : ''}>
        {children}
      </div>
    </>
  );
}
