import React from 'react';
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

  return (
    <div className={`mailerlite-form-wrapper ${className}`}>
      {/* MailerLite Embedded Form */}
      <div 
        className="ml-embedded" 
        data-form={formId}
      ></div>
    </div>
  );
}