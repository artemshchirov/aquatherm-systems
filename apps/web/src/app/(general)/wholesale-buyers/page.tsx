'use client';

import { useCallback } from 'react';
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage';
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs';

function WholesaleBuyers() {
  const getDefaultTextGenerator = useCallback(() => 'For wholesale buyers', []);
  const getTextGenerator = useCallback((param: string) => ({})[param], []);

  return (
    <>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <ContactsPage isWholesaleBuyersPage={true} />
      <div className="overlay" />
    </>
  );
}

export default WholesaleBuyers;
