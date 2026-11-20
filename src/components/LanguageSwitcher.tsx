import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center rounded-full border border-[#C7C0B6] bg-[#F4F3F0] p-0.5 shrink-0"
    >
      {!compact && (
        <span className="ps-2 pe-1 text-[#7A233E] hidden sm:inline-flex" aria-hidden="true">
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2 min-[375px]:px-2.5 py-1 text-[11px] min-[375px]:text-xs font-semibold rounded-full transition-colors duration-150 whitespace-nowrap cursor-pointer ${
          language === 'en'
            ? 'bg-[#161214] text-white'
            : 'text-[#2F2A2C] hover:text-[#161214]'
        }`}
        style={{ fontFamily: 'var(--font-sans)' }}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ur')}
        className={`px-2 min-[375px]:px-2.5 py-1 text-[11px] min-[375px]:text-xs font-medium rounded-full transition-colors duration-150 whitespace-nowrap cursor-pointer ${
          language === 'ur'
            ? 'bg-[#161214] text-white'
            : 'text-[#2F2A2C] hover:text-[#161214]'
        }`}
        style={{ fontFamily: 'var(--font-urdu)', lineHeight: 1.4 }}
        aria-pressed={language === 'ur'}
      >
        اردو
      </button>
    </div>
  );
};
