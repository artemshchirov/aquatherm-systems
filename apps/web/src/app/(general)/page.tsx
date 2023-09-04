'use client';

import type { Metadata } from 'next';
import DashboardPage from '../../components/templates/DashboardPage/DashboardPage';
import { useCallback } from 'react';
import Breadcrumbs from '../../components/modules/Breadcrumbs/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Ecommerce | Dashboard'
};

export default function Dashboard() {
  const getDefaultTextGenerator = () => '';
  const getTextGenerator = () => '';

  return (
    <>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <DashboardPage />
      <div className="overlay" />
    </>
  );
}
