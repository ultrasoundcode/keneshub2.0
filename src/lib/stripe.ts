import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = {
  get instance() {
    return getStripe();
  },
};

export const PLANS = {
  FREE: {
    name: "Free",
    nameRu: "Бесплатный",
    price: 0,
    priceId: null,
    features: [
      "Базовый AI-анализ (20 запросов/мес)",
      "Проверка законности действий",
      "Ограниченная история чатов",
    ],
    limits: {
      aiQueries: 20,
      documents: 2,
      lawyerBookings: 0,
    },
  },
  PRO: {
    name: "Pro",
    nameRu: "Профессионал",
    price: 4990,
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    features: [
      "Полный AI-анализ (200 запросов/мес)",
      "Подготовка документов",
      "Запись к юристу",
      "Анализ договоров",
      "Приоритетная поддержка",
    ],
    limits: {
      aiQueries: 200,
      documents: 20,
      lawyerBookings: 5,
    },
  },
  BUSINESS: {
    name: "Business",
    nameRu: "Бизнес",
    price: 14990,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID,
    features: [
      "Неограниченный AI-анализ",
      "Множественные кейсы",
      "Приоритетная юридическая поддержка",
      "Персональный менеджер",
      "API доступ",
      "Расширенная аналитика",
    ],
    limits: {
      aiQueries: 1000,
      documents: 100,
      lawyerBookings: 20,
    },
  },
} as const;

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return getStripe().checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

export async function createCustomer(email: string, name?: string) {
  return getStripe().customers.create({ email, name: name || undefined });
}

export async function cancelSubscription(subscriptionId: string) {
  return getStripe().subscriptions.cancel(subscriptionId);
}
