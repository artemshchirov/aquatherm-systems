'use client';

import type { Metadata } from 'next';
import AuthPage from '@/components/templates/AuthPage/AuthPage';
import useRedirectByUserCheck from '../../../hooks/useRedirectByUserCheck';

export const metadata: Metadata = {
  title: 'Ecommerce | Auth',
};

export default function Auth() {
  const { shouldLoadContent } = useRedirectByUserCheck(true);
  return <>{shouldLoadContent && <AuthPage />}</>;
}
