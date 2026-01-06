import { Topic } from './types';

export const INITIAL_TOPICS: Topic[] = [
  { id: 'familie', title: 'Familie & Freunde', emoji: '👨‍👩‍👧‍👦', description: 'Über Beziehungen und Verwandte sprechen' },
  { id: 'essen', title: 'Essen & Trinken', emoji: '🍕', description: 'Restaurant, Kochen und Vorlieben' },
  { id: 'reisen', title: 'Reisen & Urlaub', emoji: '✈️', description: 'Urlaubserlebnisse und Planungen' },
  { id: 'arbeit', title: 'Arbeit & Beruf', emoji: '💼', description: 'Jobs, Kollegen und Alltag im Büro' },
  { id: 'wohnen', title: 'Wohnen', emoji: '🏠', description: 'Haus, Wohnung und Möbel' },
  { id: 'freizeit', title: 'Freizeit & Hobbys', emoji: '🎨', description: 'Sport, Musik und Wochenende' },
  { id: 'einkaufen', title: 'Einkaufen', emoji: '🛍️', description: 'Kleidung, Supermarkt und Preise' },
  { id: 'gesundheit', title: 'Gesundheit', emoji: '🏥', description: 'Beim Arzt, Körper und Sport' },
];

export const APP_NAME = "DeutschDialog A2";