import React, { useState } from 'react';
import { Book, CheckSquare, GraduationCap, LayoutList } from 'lucide-react';
import { GRAMMAR_EXERCISES } from '../data/grammarData';
import GrammarExercise from '../components/grammar/GrammarExercise';
import GrammarReference from '../components/grammar/GrammarReference';

const GrammarHub: React.FC = () => {
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'exercises' | 'reference'>('exercises');

  const activeExercise = GRAMMAR_EXERCISES.find(e => e.id === activeExerciseId);

  return (
    <div className="min-h-[80vh]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 flex items-center justify-center gap-3">
          <GraduationCap className="w-10 h-10 text-indigo-600" />
          Grammatik Training
        </h1>
        <p className="text-lg text-slate-600">Übungen und Regeln für das Niveau A2</p>
      </div>

      {/* Main Navigation Toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
          <button
            onClick={() => { setViewMode('exercises'); setActiveExerciseId(null); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              viewMode === 'exercises' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            Übungen
          </button>
          <button
            onClick={() => { setViewMode('reference'); setActiveExerciseId(null); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              viewMode === 'reference' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Book className="w-5 h-5" />
            Übersicht
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'reference' ? (
        <GrammarReference />
      ) : activeExercise ? (
        <GrammarExercise 
          data={activeExercise} 
          onComplete={() => setActiveExerciseId(null)} 
        />
      ) : (
        /* Exercise List */
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 animate-fade-in">
          {GRAMMAR_EXERCISES.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveExerciseId(ex.id)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all text-left group"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {ex.title}
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                  {ex.id}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                {ex.description}
              </p>
              <div className="flex items-center gap-2 text-indigo-600 font-medium text-sm">
                <LayoutList className="w-4 h-4" />
                {ex.questions.length} Aufgaben
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GrammarHub;