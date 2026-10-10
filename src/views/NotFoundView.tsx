import React from 'react';
import { Compass, ArrowLeft, Home } from 'lucide-react';

interface NotFoundViewProps {
  onGoHome: () => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 text-[#184E3F] flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 text-[#E27D48]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-[#184E3F] uppercase tracking-wider">
            Page Not Found · 404
          </span>
          <h1 className="text-3xl font-bold text-neutral-900 font-serif-heading">
            Destination Not Found
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The destination or page you are looking for does not exist or may have been moved. Discover one of Sri Lanka’s 13 curated regions instead.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="px-5 py-2.5 rounded-xl bg-[#184E3F] text-white text-xs font-semibold hover:bg-[#0E352A] transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  );
};
