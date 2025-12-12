import DOMPurify from 'dompurify';
import { marked } from 'marked';

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} html - Raw HTML string
 * @returns {string} - Sanitized HTML
 */
export const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOW_DATA_ATTR: false
  });
};

/**
 * Convert Markdown to sanitized HTML
 * @param {string} markdown - Markdown string
 * @returns {string} - Sanitized HTML
 */
export const markdownToHTML = (markdown) => {
  const rawHTML = marked.parse(markdown);
  return sanitizeHTML(rawHTML);
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} - Truncated text with ellipsis
 */
export const truncateText = (text, length = 150) => {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
};