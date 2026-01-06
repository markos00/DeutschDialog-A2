import React from 'react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  return (
    <button
      onClick={() => onClick(topic)}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 transition-all duration-300 text-left group flex flex-col h-full hover:-translate-y-1"
    >
      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {topic.emoji}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
        {topic.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {topic.description}
      </p>
    </button>
  );
};

export default TopicCard;
