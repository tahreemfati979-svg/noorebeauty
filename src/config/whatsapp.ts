/**
 * Centralized WhatsApp Business Configuration for noore'beauty.
 *
 * Update `businessPhone` below with your WhatsApp number in international format
 * WITHOUT "+", spaces, dashes, or leading zeros.
 * Example for Pakistan (+92 300 1234567): '923001234567'
 */
export function sanitizeWhatsAppNumber(raw: string): string {
  return raw.replace(/\D/g, '');
}

const ENV_WHATSAPP_NUMBER =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_WHATSAPP_NUMBER
    ? String(import.meta.env.VITE_WHATSAPP_NUMBER)
    : '';

export const WHATSAPP_CONFIG = {
  /**
   * Store owner WhatsApp Business number (international digits only, e.g. '923001234567').
   * You can replace the default number directly here or set VITE_WHATSAPP_NUMBER.
   */
  businessPhone: sanitizeWhatsAppNumber(ENV_WHATSAPP_NUMBER || '923322127629'),

  /**
   * Human-readable display format shown on the Contact page & order helper cards.
   */
  displayPhone: '+92 332 212 7629',

  ownerName: {
    en: 'Tahreem',
    ur: 'تحریم',
  },

  storeName: {
    en: "noore'beauty",
    ur: 'نورِ بیوٹی',
  },
} as const;

/**
 * Builds a properly URL-encoded WhatsApp Click-to-Chat URL (works on mobile & desktop).
 */
export function buildWhatsAppClickToChatUrl(message: string, phoneOverride?: string): string {
  const cleanPhone = sanitizeWhatsAppNumber(phoneOverride || WHATSAPP_CONFIG.businessPhone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
