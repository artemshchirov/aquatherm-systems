'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />
    </>
  );
}
