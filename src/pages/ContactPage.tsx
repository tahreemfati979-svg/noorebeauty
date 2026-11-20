import React, { useState } from 'react';
import { ChevronDown, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitted(false);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!name.trim() || !validEmail || !message.trim()) {
      setFormError(t.checkout.validationRequired);
      return;
    }
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16 space-y-12 sm:space-y-16">
      <div className="max-w-2xl space-y-3">
        <p className="text-xs font-bold text-[#7A233E] uppercase tracking-wider">
          {t.contact.kicker}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-medium text-[#161214]">
          {t.contact.title}
        </h1>
        <p className="text-sm sm:text-base text-[#2F2A2C] leading-relaxed">{t.contact.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-start">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-7 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 lg:p-10 space-y-5"
        >
          <h2 className="font-display text-2xl font-semibold text-[#161214]">
            {t.contact.formTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#161214] block">
                {t.contact.nameLabel} *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#161214] block">
                {t.contact.emailLabel} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#161214] block">
              {t.contact.subjectLabel}
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#161214] block">
              {t.contact.messageLabel} *
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-[#C7C0B6] bg-[#F4F3F0] px-4 py-2.5 text-base sm:text-sm text-[#161214] focus:outline-none focus:border-[#7A233E]"
            />
          </div>

          {formError && (
            <p role="alert" className="text-xs font-semibold text-[#B91C1C]">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-[#161214] text-white px-8 py-3.5 text-xs font-semibold hover:bg-[#2E2528] transition-colors cursor-pointer"
          >
            {t.contact.sendCta}
          </button>

          {submitted && (
            <p className="text-sm font-medium text-[#7A233E] bg-[#F6ECF0] border border-[#7A233E]/25 rounded-xl px-4 py-3">
              {t.contact.sentSuccess}
            </p>
          )}
        </form>

        {/* Directory Info */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl bg-white border border-[#D4CFC7] p-5 sm:p-8 lg:p-9 space-y-6">
          <h2 className="font-display text-2xl font-semibold text-[#161214]">
            {t.contact.infoTitle}
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3.5">
              <Mail className="w-4 h-4 text-[#7A233E] mt-1 shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[#161214]">{t.contact.emailTitle}</p>
                <p className="text-[#2F2A2C] break-all">concierge@noorebeauty.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-4 h-4 text-[#7A233E] mt-1 shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[#161214]">{t.contact.phoneTitle}</p>
                <a
                  href={`https://wa.me/${WHATSAPP_CONFIG.businessPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                  className="text-[#161214] font-semibold hover:text-[#7A233E] underline tabular-nums inline-block py-0.5"
                >
                  {WHATSAPP_CONFIG.displayPhone}
                </a>
                <p className="text-xs font-medium text-[#7A233E] mt-0.5">
                  {WHATSAPP_CONFIG.ownerName[language]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <MapPin className="w-4 h-4 text-[#7A233E] mt-1 shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[#161214]">{t.contact.addressTitle}</p>
                <p className="text-[#2F2A2C]">{t.contact.addressValue}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="w-4 h-4 text-[#7A233E] mt-1 shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-[#161214]">{t.contact.hoursTitle}</p>
                <p className="text-[#2F2A2C]">{t.contact.hoursValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <section className="pt-8 border-t border-[#D4CFC7] space-y-6 max-w-4xl">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#161214]">
          {t.contact.faqTitle}
        </h2>
        <div className="space-y-3">
          {t.contact.faqs.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#D4CFC7] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-start font-semibold text-[#161214] cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A233E] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-sm text-[#2F2A2C] leading-relaxed border-t border-[#E0DCD3] pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
