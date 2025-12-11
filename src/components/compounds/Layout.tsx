import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => (
  <div className="min-h-screen">
    {/* You can add header, sidebar, footer here */}
    <main>
      <Outlet />
    </main>
  </div>
);
