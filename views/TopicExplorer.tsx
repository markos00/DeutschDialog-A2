import React from 'react';
import { Topic } from '../types';
import { INITIAL_TOPICS } from '../constants';
import TopicCard from '../components/TopicCard';

interface TopicExplorerProps {
  onSelectTopic: (topic: Topic) => void;
}

const TopicExplorer: React.FC<TopicExplorerProps> = ({ onSelectTopic }) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">Themenübersicht</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Worüber wollt ihr heute sprechen? Wähle ein Thema, um passende Fragen und Vokabeln für euren Dialog zu erhalten.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {INITIAL_TOPICS.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onClick={onSelectTopic}
          />
        ))}
      </div>
    </div>
  );
};

export default TopicExplorer;