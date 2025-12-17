import { useEffect } from 'react';

/**
 * Custom hook to inject MailerLite Universal script
 * Only loads once per application lifecycle
 */
export const useMailerLite = () => {
  useEffect(() => {
    // Check if script already exists
    if (window.ml) {
      console.log('✓ MailerLite already loaded');
      return;
    }

    // Inject MailerLite Universal script
    (function(w, d, e, u, f, l, n) {
      w[f] = w[f] || function() {
        (w[f].q = w[f].q || []).push(arguments);
      };
      l = d.createElement(e);
      l.async = 1;
      l.src = u;
      n = d.getElementsByTagName(e)[0];
      n.parentNode.insertBefore(l, n);
    })(
      window,
      document,
      'script',
      'https://assets.mailerlite.com/js/universal.js',
      'ml'
    );

    // Initialize MailerLite with your account ID
    if (window.ml) {
      window.ml('account', '1985294');
      console.log('✓ MailerLite initialized');
    }

    // Cleanup function
    return () => {
      // Note: MailerLite script typically stays loaded
      console.log('MailerLite cleanup (script remains for performance)');
    };
  }, []);
};