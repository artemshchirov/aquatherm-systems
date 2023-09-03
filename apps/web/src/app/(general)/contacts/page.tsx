'use client';

import { useCallback } from 'react';
import ContactsPage from '@/components/templates/ContactsPage/ContactsPage';
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs';

function Contacts() {
  const getDefaultTextGenerator = useCallback(() => 'Contacts', []);
  const getTextGenerator = useCallback((param: string) => ({})[param], []);

  return (
    <>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <ContactsPage />
      <div className="overlay" />
    </>
  );
}

export default Contacts;
