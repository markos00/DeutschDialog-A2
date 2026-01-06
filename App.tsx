import React, { useState } from 'react';
import Layout from './components/Layout';
import { View, Topic } from './types';
import Home from './views/Home';
import TopicExplorer from './views/TopicExplorer';
import TopicDetail from './views/TopicDetail';
import GameHub from './views/GameHub';
import ExamHub from './views/ExamHub';
import TeacherTools from './views/TeacherTools';
import VocabTrainer from './views/VocabTrainer'; 
import GrammarHub from './views/GrammarHub'; // New Import
import TabooGame from './components/games/TabooGame';
import RolePlayGame from './components/games/RolePlayGame';
import WouldYouRatherGame from './components/games/WouldYouRatherGame';
import StoryGame from './components/games/StoryGame';
import ExamWriting from './components/exam/ExamWriting';
import ExamReading from './components/exam/ExamReading';
import ExamSpeaking from './components/exam/ExamSpeaking';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView(View.TOPIC_DETAIL);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onNavigate={setCurrentView} />;
      
      case View.TOPICS:
        return <TopicExplorer onSelectTopic={handleTopicSelect} />;
      
      case View.TOPIC_DETAIL:
        return selectedTopic ? (
          <TopicDetail topic={selectedTopic} onBack={() => setCurrentView(View.TOPICS)} />
        ) : (
          <TopicExplorer onSelectTopic={handleTopicSelect} />
        );

      case View.VOCAB_TRAINER:
        return <VocabTrainer />;

      case View.GRAMMAR: // New Route
        return <GrammarHub />;

      case View.TOOLS:
        return <TeacherTools />;

      // Games Section
      case View.GAMES:
        return <GameHub onSelectGame={setCurrentView} />;
      case View.GAME_TABOO:
        return <GameWrapper onBack={() => setCurrentView(View.GAMES)}><TabooGame /></GameWrapper>;
      case View.GAME_ROLEPLAY:
        return <GameWrapper onBack={() => setCurrentView(View.GAMES)}><RolePlayGame /></GameWrapper>;
      case View.GAME_WOULD_YOU_RATHER:
        return <GameWrapper onBack={() => setCurrentView(View.GAMES)}><WouldYouRatherGame /></GameWrapper>;
      case View.GAME_STORY:
        return <GameWrapper onBack={() => setCurrentView(View.GAMES)}><StoryGame /></GameWrapper>;

      // Exam Section
      case View.EXAM_HUB:
        return <ExamHub onSelectExam={setCurrentView} />;
      case View.EXAM_WRITING:
        return <GameWrapper onBack={() => setCurrentView(View.EXAM_HUB)}><ExamWriting /></GameWrapper>;
      case View.EXAM_READING:
        return <GameWrapper onBack={() => setCurrentView(View.EXAM_HUB)}><ExamReading /></GameWrapper>;
      case View.EXAM_SPEAKING:
        return <GameWrapper onBack={() => setCurrentView(View.EXAM_HUB)}><ExamSpeaking /></GameWrapper>;

      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

// Helper component for consistent back buttons
const GameWrapper: React.FC<{ children: React.ReactNode; onBack: () => void }> = ({ children, onBack }) => (
  <div className="space-y-4">
    <button 
      onClick={onBack}
      className="text-slate-500 hover:text-indigo-600 font-medium hover:underline mb-4 inline-block transition-colors"
    >
      &larr; Zurück zur Übersicht
    </button>
    {children}
  </div>
);

export default App;