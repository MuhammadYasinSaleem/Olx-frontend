/**
 * @fileoverview Main layout component wrapping pages with header and common structure.
 * @module components/compounds/Layout
 */

import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@components/molecules';

/**
 * Layout component providing consistent page structure.
 *
 * Features:
 * - Sticky header navigation
 * - Main content area with router outlet
 * - Minimum full screen height
 * - Gray background styling
 *
 * @returns {JSX.Element} Layout component
 */
export const Layout: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
