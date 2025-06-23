// app/components/ToastProvider.tsx
'use client'; // This directive is crucial

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the default CSS theme

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right" 
      autoClose={5000} 
      hideProgressBar={false} // Show/hide the progress bar
      newestOnTop={false} 
      closeOnClick // Close toast on click
      rtl={false} // Right-to-left support
      pauseOnFocusLoss // Pause autoClose when window loses focus
      draggable // Allow dragging to dismiss
      pauseOnHover // Pause autoClose when mouse hovers over toast
      theme="light"
    />
  );
}