'use client';

import { useState } from 'react';
import { X, Download, Mail, Loader2 } from 'lucide-react';

interface EmailModalProps {
  isDarkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailModal({ isDarkMode, isOpen, onClose }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call to save email (you can replace this with actual API)
    try {
      // Here you would typically send the email to your backend
      // await fetch('/api/save-email', { method: 'POST', body: JSON.stringify({ email }) });

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay

      setIsSuccess(true);

      // Trigger CV download
      const link = document.createElement('a');
      link.href = '/cv/Prohmpiriya_CV.pdf'; // Make sure to add your CV file here
      link.download = 'Prohmpiriya_Phonumnuaisuk_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset and close after a delay
      setTimeout(() => {
        setEmail('');
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl transform transition-all ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDarkMode
              ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className={`inline-flex p-4 rounded-full mb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <Download className={`w-8 h-8 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Download My CV
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Enter your email to download my resume
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <div className={`relative flex items-center rounded-xl border ${
                  error
                    ? 'border-red-500'
                    : isDarkMode
                      ? 'border-gray-600 focus-within:border-gray-400'
                      : 'border-gray-300 focus-within:border-gray-400'
                }`}>
                  <Mail className={`absolute left-4 w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none ${
                      isDarkMode
                        ? 'bg-transparent text-white placeholder-gray-500'
                        : 'bg-transparent text-gray-900 placeholder-gray-400'
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? 'bg-white hover:bg-gray-200 text-black disabled:bg-gray-600'
                    : 'bg-gray-900 hover:bg-black text-white disabled:bg-gray-400'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    Download CV
                  </>
                )}
              </button>
            </form>

            <p className={`mt-4 text-xs text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Your email will be kept private and only used for professional contact.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div className={`inline-flex p-4 rounded-full mb-4 ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
              <Download className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Download Started!
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Thank you! Your download should begin automatically.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
