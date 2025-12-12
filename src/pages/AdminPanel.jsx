import React, { useState } from 'react';
import { markdownToHTML, truncateText } from '../utils/sanitize';
import { saveArticle } from '../services/api';

export default function AdminPanel() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    thumbnail: '',
    category: 'Technology',
    readTime: '5 min',
    published: true
  });
  
  const [preview, setPreview] = useState(false);
  const [success, setSuccess] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('');

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      alert('Title and content are required!');
      return;
    }
    
    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Convert markdown to HTML
      const htmlContent = markdownToHTML(formData.content);
      
      // Auto-generate excerpt if not provided
      const excerpt = formData.excerpt || 
        truncateText(formData.content.replace(/[#*`]/g, ''), 150);
      
      const article = {
        slug,
        title: formData.title,
        excerpt,
        content: htmlContent,
        thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
        category: formData.category,
        author: 'France Khalil',
        readTime: formData.readTime,
        published: formData.published
      };
      
      const result = await saveArticle(article);
      
      // Show JSON output for manual copying
      setJsonOutput(JSON.stringify(result.article, null, 2));
      setSuccess(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          thumbnail: '',
          category: 'Technology',
          readTime: '5 min',
          published: true
        });
        setSuccess(false);
      }, 5000);
      
    } catch (error) {
      alert('Error creating article: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-4 border-black bg-black text-white p-8 mb-8">
          <h1 className="text-5xl font-black uppercase mb-2">Admin Panel</h1>
          <p className="font-serif">Create and manage your blog articles</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="border-4 border-black bg-green-50 p-6 mb-8">
            <div className="text-2xl font-black uppercase mb-4">✅ Article Created!</div>
            <p className="font-serif mb-4">Copy this JSON and add it to your articles.json file:</p>
            <pre className="bg-black text-white p-4 overflow-x-auto text-xs">
              {jsonOutput}
            </pre>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="border-4 border-black bg-white">
            <div className="border-b-4 border-black p-6 bg-yellow-50">
              <h2 className="text-3xl font-black uppercase">New Article</h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-xs uppercase font-black mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border-4 border-black font-bold"
                  placeholder="My Awesome Article"
                />
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-black mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-black font-bold"
                  >
                    <option>Technology</option>
                    <option>Data Engineering</option>
                    <option>Design</option>
                    <option>Engineering</option>
                    <option>Architecture</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs uppercase font-black mb-2">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    className="w-full px-4 py-3 border-4 border-black font-bold"
                    placeholder="5 min"
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-xs uppercase font-black mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                  className="w-full px-4 py-3 border-4 border-black font-bold"
                  placeholder="https://images.unsplash.com/..."
                />
                <p className="text-xs mt-1 font-serif">Use Unsplash for free images</p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs uppercase font-black mb-2">Excerpt (Optional)</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-3 border-4 border-black font-serif"
                  placeholder="Brief summary (auto-generated if empty)"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs uppercase font-black mb-2">Content (Markdown) *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={12}
                  className="w-full px-4 py-3 border-4 border-black font-mono text-sm"
                  placeholder="## Heading\n\nYour content here..."
                />
                <p className="text-xs mt-1 font-serif">Supports Markdown formatting</p>
              </div>

              {/* Published Toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  className="w-6 h-6 border-4 border-black"
                />
                <span className="text-sm font-black uppercase">Publish Immediately</span>
              </label>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-black text-white font-black uppercase py-4 hover:bg-gray-800 transition-colors"
                >
                  Create Article
                </button>
                <button
                  onClick={() => setPreview(!preview)}
                  className="flex-1 border-4 border-black font-black uppercase py-4 hover:bg-gray-100 transition-colors"
                >
                  {preview ? 'Hide' : 'Show'} Preview
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-4 border-black bg-white">
            <div className="border-b-4 border-black p-6 bg-gray-900 text-white">
              <h2 className="text-3xl font-black uppercase">Preview</h2>
            </div>
            
            {preview ? (
              <div className="p-6">
                {formData.thumbnail && (
                  <img 
                    src={formData.thumbnail} 
                    alt="Preview"
                    className="w-full border-4 border-black mb-4"
                  />
                )}
                
                <div className="border-4 border-black p-4 bg-black text-white text-xs font-black uppercase mb-4">
                  {formData.category}
                </div>
                
                <h3 className="text-3xl font-black uppercase mb-4">
                  {formData.title || 'Your Title Here'}
                </h3>
                
                <p className="font-serif text-sm mb-4 text-gray-700">
                  {formData.excerpt || truncateText(formData.content, 150)}
                </p>
                
                <div className="border-t-2 border-black pt-4">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: markdownToHTML(formData.content || '*No content yet...*')
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <div className="text-6xl mb-4">📝</div>
                <p className="font-serif">Click "Show Preview" to see your article</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 border-4 border-black bg-blue-50 p-8">
          <h3 className="text-2xl font-black uppercase mb-4">📌 How to Use</h3>
          <ol className="space-y-2 font-serif list-decimal list-inside">
            <li>Fill in the form with your article details</li>
            <li>Write content using Markdown syntax</li>
            <li>Click "Create Article" to generate JSON</li>
            <li>Copy the JSON output from the success message</li>
            <li>Paste it into <code className="bg-black text-white px-2 py-1">src/data/articles.json</code></li>
            <li>Refresh your site to see the new article!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}