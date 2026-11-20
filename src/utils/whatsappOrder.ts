import { Language, Product, ShadeOption } from '../types';

export interface WhatsAppCheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export interface WhatsAppOrderItem {
  product: Product;
  shade: ShadeOption;
  quantity: number;
}

export interface WhatsAppCheckoutValidationErrors {
  fullName?: 'required';
  phone?: 'required' | 'invalid';
  email?: 'invalid';
  address?: 'required';
  city?: 'required';
}

export interface FormatWhatsAppOrderMessageParams {
  language: Language;
  orderId: string;
  customer: WhatsAppCheckoutForm;
  items: WhatsAppOrderItem[];
  subtotal: number;
  discountAmount: number;
  loyaltyDiscountAmount: number;
  shippingCost: number;
  total: number;
  couponCode?: string;
  formatPrice: (pkr: number) => string;
}

export function generateWhatsAppOrderId(): string {
  return `NB-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function validateWhatsAppCheckout(
  form: WhatsAppCheckoutForm
): WhatsAppCheckoutValidationErrors {
  const errors: WhatsAppCheckoutValidationErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = 'required';
  }

  const cleanDigits = form.phone.replace(/\D/g, '');
  if (!form.phone.trim()) {
    errors.phone = 'required';
  } else if (cleanDigits.length < 7) {
    errors.phone = 'invalid';
  }

  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'invalid';
  }

  if (!form.address.trim()) {
    errors.address = 'required';
  }

  if (!form.city.trim()) {
    errors.city = 'required';
  }

  return errors;
}

/**
 * Generates a formatted English or Urdu WhatsApp Click-to-Chat order message
 * without exposing any sensitive payment credentials.
 */
export function formatWhatsAppOrderMessage({
  language,
  orderId,
  customer,
  items,
  subtotal,
  discountAmount,
  loyaltyDiscountAmount,
  shippingCost,
  total,
  couponCode,
  formatPrice,
}: FormatWhatsAppOrderMessageParams): string {
  const fullName = customer.fullName.trim();
  const phone = customer.phone.trim();
  const email = customer.email.trim();
  const address = customer.address.trim();
  const city = customer.city.trim();
  const notes = customer.notes.trim();

  if (language === 'ur') {
    const itemBlocks = items.map(({ product, shade, quantity }) => {
      const unitPrice = formatPrice(product.price);
      const lineTotal = formatPrice(product.price * quantity);
      return [
        `پروڈکٹ: ${product.name.ur}`,
        `تعداد: ${quantity}`,
        `قیمت: ${unitPrice} (مجموعی: ${lineTotal})`,
        `منتخب شیڈ: ${shade.name.ur}`,
      ].join('\n');
    });

    const lines: string[] = [
      `السلام علیکم! میں آرڈر دینا چاہتی/چاہتا ہوں۔`,
      ``,
      `آرڈر آئی ڈی: #${orderId}`,
      ``,
      `*صارف کی معلومات*`,
      `نام: ${fullName}`,
      `فون نمبر: ${phone}`,
      `ای میل: ${email || 'فراہم نہیں کیا گیا'}`,
      `شہر: ${city}`,
      `مکمل پتہ: ${address}`,
      ``,
      `*آرڈر کی تفصیلات*`,
      ``,
      itemBlocks.join('\n\n'),
      ``,
      `ذیلی کل: ${formatPrice(subtotal)}`,
    ];

    if (discountAmount > 0) {
      lines.push(
        `رعایتی کوڈ${couponCode ? ` (${couponCode})` : ''}: -${formatPrice(discountAmount)}`
      );
    }
    if (loyaltyDiscountAmount > 0) {
      lines.push(`نور کلب لائلٹی رعایت: -${formatPrice(loyaltyDiscountAmount)}`);
    }

    lines.push(
      `ڈیلیوری چارجز: ${shippingCost === 0 ? 'مفت' : formatPrice(shippingCost)}`,
      `کل رقم: ${formatPrice(total)}`,
      ``,
      `اضافی ہدایات: ${notes || 'کوئی نہیں'}`,
      ``,
      `شکریہ!`
    );

    return lines.join('\n');
  }

  const itemBlocks = items.map(({ product, shade, quantity }) => {
    const unitPrice = formatPrice(product.price);
    const lineTotal = formatPrice(product.price * quantity);
    return [
      `Product: ${product.name.en}`,
      `Quantity: ${quantity}`,
      `Price: ${unitPrice} (Line Total: ${lineTotal})`,
      `Selected Shade: ${shade.name.en}`,
    ].join('\n');
  });

  const lines: string[] = [
    `Hello! I would like to place an order.`,
    ``,
    `Order ID: #${orderId}`,
    ``,
    `*CUSTOMER INFORMATION*`,
    `Name: ${fullName}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    `City: ${city}`,
    `Delivery Address: ${address}`,
    ``,
    `*ORDER DETAILS*`,
    ``,
    itemBlocks.join('\n\n'),
    ``,
    `Subtotal: ${formatPrice(subtotal)}`,
  ];

  if (discountAmount > 0) {
    lines.push(
      `Promo Discount${couponCode ? ` (${couponCode})` : ''}: -${formatPrice(discountAmount)}`
    );
  }
  if (loyaltyDiscountAmount > 0) {
    lines.push(`Loyalty Credit: -${formatPrice(loyaltyDiscountAmount)}`);
  }

  lines.push(
    `Delivery Charges: ${shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}`,
    `Total Amount: ${formatPrice(total)}`,
    ``,
    `Additional Notes: ${notes || 'None'}`,
    ``,
    `Thank you!`
  );

  return lines.join('\n');
}
