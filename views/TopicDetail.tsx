import React, { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, Loader2, MessageCircle, Sparkles, AlertCircle, MessageSquareQuote } from 'lucide-react';
import { Topic, TopicContent } from '../types';
import { GeminiService } from '../services/geminiService';

interface TopicDetailProps {
  topic: Topic;
  onBack: () => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ topic, onBack }) => {
  const [content, setContent] = useState<TopicContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GeminiService.getTopicContent(topic.title);
        setContent(data);
      } catch (err) {
        console.error(err);
        setError("Konnte Inhalte nicht laden. Bitte prüfe deine Internetverbindung.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [topic]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-slate-700">Erstelle Inhalte für "{topic.title}"...</h2>
        <p className="text-slate-500 mt-2">Die KI sucht passende Fragen, Vokabeln und Redemittel.</p>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-lg mx-auto">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Ups, ein Fehler!</h3>
        <p className="text-slate-600 mb-6">{error || "Unbekannter Fehler"}</p>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-medium"
        >
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Zurück zu den Themen
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="text-6xl">{topic.emoji}</div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{topic.title}</h1>
          <p className="text-xl text-slate-600">{topic.description}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Thesen & Redemittel */}
        <div className="space-y-6">
          {/* Thesen Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Thesen zur Diskussion</h2>
            </div>
            <ul className="space-y-4">
              {content.thesen.map((these, idx) => (
                <li key={idx} className="flex gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-slate-800">
                  <span className="font-bold text-amber-500 text-xl">{idx + 1}.</span>
                  <span className="text-lg font-medium leading-relaxed">"{these}"</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Redemittel Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Redemittel</h2>
            </div>
            <ul className="space-y-3">
              {content.phrases.map((phrase, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700 bg-blue-50 px-4 py-3 rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0"></div>
                  <span className="font-medium italic">"{phrase}"</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Questions & Vocab */}
        <div className="space-y-6">
          {/* Fragen Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Gesprächsfragen</h2>
            </div>
            <div className="grid gap-4">
              {content.fragen.map((frage, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="p-5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl transition-all duration-200">
                    <p className="text-lg text-slate-700 font-medium group-hover:text-indigo-900">
                      {frage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary Section (List Only) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Wichtige Vokabeln</h2>
              </div>
            </div>

            <div className="grid gap-3">
              {content.vocabulary.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center px-4 py-3 bg-slate-50 text-slate-800 border border-slate-200 rounded-xl shadow-sm">
                  <span className="font-bold text-lg">{item.word}</span>
                  <span className="text-slate-500 text-sm italic">{item.translation}</span>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              Mehr Vokabeln und Spiele findest du im Bereich "Wortschatz".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;