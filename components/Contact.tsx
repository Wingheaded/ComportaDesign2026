
import React, { useState } from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface ContactProps {
  language: Language;
}

const Contact: React.FC<ContactProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="bg-white py-20 md:py-32 scroll-mt-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-grotesk text-3xl md:text-4xl font-medium mb-4">
              {CONTENT.contactSection.title[language]}
            </h2>
          </div>
          
          {status === 'success' ? (
            <div className="bg-light-sand p-8 rounded-2xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-soft-black text-white rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xl font-medium text-soft-black">
                {CONTENT.contactSection.successMessage[language]}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-soft-black/70 mb-2">
                  {CONTENT.contactSection.nameLabel[language]}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-light-sand/50 border border-soft-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-black/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-soft-black/70 mb-2">
                  {CONTENT.contactSection.emailLabel[language]}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-light-sand/50 border border-soft-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-black/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-soft-black/70 mb-2">
                  {CONTENT.contactSection.messageLabel[language]}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-light-sand/50 border border-soft-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-black/20 transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-soft-black text-white font-medium py-4 rounded-full hover:bg-opacity-80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
                  </span>
                ) : (
                  CONTENT.contactSection.submitButton[language]
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
