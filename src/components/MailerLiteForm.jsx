import React, { useEffect, useRef } from 'react';
import { useMailerLite } from '../hooks/useMailerLite';

/**
 * MailerLite Embedded Form Component
 * @param {string} formId - Your MailerLite form ID (default: h6pPj4)
 * @param {string} className - Additional CSS classes for wrapper
 */
export default function MailerLiteForm({ 
  formId = 'h6pPj4', 
  className = '' 
}) {
  // Initialize MailerLite script
  useMailerLite();
  
  const formRef = useRef(null);

  useEffect(() => {
    // Check if form is rendered
    if (formRef.current) {
      console.log('✓ MailerLite form container mounted');
      
      // Wait for MailerLite script to fully load
      const checkFormLoad = setInterval(() => {
        if (formRef.current && formRef.current.querySelector('form')) {
          console.log('✓ MailerLite form fully rendered');
          clearInterval(checkFormLoad);
        }
      }, 500);

      // Clear interval after 10 seconds to prevent memory leak
      setTimeout(() => clearInterval(checkFormLoad), 10000);

      return () => clearInterval(checkFormLoad);
    }
  }, [formId]);

  return (
    <div 
      ref={formRef}
      className={`mailerlite-form-wrapper ${className}`}
    >
      {/* MailerLite Embedded Form */}
      <div 
        className="ml-embedded" 
        data-form={formId}
      ></div>
    </div>
  );
}