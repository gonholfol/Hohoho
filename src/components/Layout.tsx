import React from 'react';
import SnowEffect from './SnowEffect';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full relative">
      {children}
      <SnowEffect />
    </div>
  );
}; 