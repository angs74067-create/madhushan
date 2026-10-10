import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, MapPin, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
          Travel Inquiries & Feedback
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 font-serif-heading">
          Contact Our Editorial Team
        </h1>
        <p className="text-base text-neutral-600 leading-relaxed">
          Have an inquiry about an upcoming journey, or want to suggest a verified local attraction or dining correction? We’d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-neutral-200/90 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 font-serif-heading">
                Message Sent Successfully
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting Discover Sri Lanka. Our editorial team reviews every inquiry and verified destination update promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Question', message: '' });
                }}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#184E3F] bg-[#184E3F]/10 hover:bg-[#184E3F]/20 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Kasun Fernando"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#184E3F] focus:ring-1 focus:ring-[#184E3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. traveler@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#184E3F] focus:ring-1 focus:ring-[#184E3F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:border-[#184E3F] focus:ring-1 focus:ring-[#184E3F]"
                >
                  <option value="General Question">General Question about Sri Lanka</option>
                  <option value="Itinerary Advice">Itinerary & Destination Advice</option>
                  <option value="Business Update">Listing Update or Coordinate Correction</option>
                  <option value="Editorial Feedback">Editorial Feedback & Suggestion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist with your travel planning?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#184E3F] focus:ring-1 focus:ring-[#184E3F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#184E3F] text-white text-xs font-semibold hover:bg-[#0E352A] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Send Travel Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-6 space-y-4 shadow-xs text-xs">
            <h3 className="text-sm font-bold text-neutral-900 font-serif-heading">
              Official Helpline Resources
            </h3>
            <p className="text-neutral-600 leading-relaxed">
              If you require immediate tourist safety assistance while travelling in Sri Lanka, contact the national helplines:
            </p>
            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <div className="font-semibold text-neutral-900">Sri Lanka Tourist Police</div>
                <div className="text-[#184E3F] font-mono font-bold mt-0.5">Dial 1912</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                <div className="font-semibold text-neutral-900">Emergency Medical Service</div>
                <div className="text-[#184E3F] font-mono font-bold mt-0.5">Dial 1990 (Free)</div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-6 space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <MessageSquare className="w-4 h-4 text-[#184E3F]" />
              <span>Independent Verification</span>
            </div>
            <p className="leading-relaxed">
              We update coordinate markers and operating details quarterly based on field reports and traveler feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
