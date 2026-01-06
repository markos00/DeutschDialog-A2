export enum View {
  HOME = 'HOME',
  TOPICS = 'TOPICS',
  TOPIC_DETAIL = 'TOPIC_DETAIL',
  VOCAB_TRAINER = 'VOCAB_TRAINER',
  GRAMMAR = 'GRAMMAR', // New Top-Level Section
  GAMES = 'GAMES',
  GAME_TABOO = 'GAME_TABOO',
  GAME_ROLEPLAY = 'GAME_ROLEPLAY',
  GAME_WOULD_YOU_RATHER = 'GAME_WOULD_YOU_RATHER',
  GAME_STORY = 'GAME_STORY',
  TOOLS = 'TOOLS',
  EXAM_HUB = 'EXAM_HUB',
  EXAM_WRITING = 'EXAM_WRITING',
  EXAM_READING = 'EXAM_READING',
  EXAM_SPEAKING = 'EXAM_SPEAKING',
}

export interface Topic {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

export interface VocabularyItem {
  word: string;
  translation: string;
  example: string;
}

export interface TopicContent {
  thesen: string[];
  fragen: string[];
  vocabulary: VocabularyItem[]; // Updated from string[]
  phrases: string[];
}

export interface TabooCard {
  word: string;
  forbidden: string[];
}

export interface RolePlayScenario {
  title: string;
  situation: string;
  roleA: string;
  roleB: string;
  goal: string;
  phrases: string[]; 
}

export interface WouldYouRatherScenario {
  optionA: string;
  optionB: string;
}

export interface StoryStarter {
  sentence: string;
  words: string[];
  genre: string;
}

export interface CorrectionResult {
  corrected: string;
  explanation: string;
}

// NEW EXAM INTERFACES

export interface WritingTask {
  type: 'SMS' | 'EMAIL';
  situation: string;
  points: string[]; // The 3 points that must be covered
}

export interface WritingFeedback {
  correctedText: string;
  grammarFeedback: string;
  contentFeedback: string; // Did the student cover all 3 points?
  score: number; // 0-10
}

export interface ReadingTask {
  text: string;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
  };
  correctAnswer: 'a' | 'b' | 'c';
}

export interface SpeakingTask {
  topic: string;
  task: string;
  pointsToDiscuss: string[];
}

export interface NavItem {
  id: View;
  label: string;
  icon: any;
}