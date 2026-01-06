import React, { useState } from 'react';
import { BookOpen, BrainCircuit, ChevronLeft, ChevronRight, Gamepad2, Layers, LayoutGrid, List, Loader2, RefreshCw, RotateCw, Volume2 } from 'lucide-react';
import { Topic, VocabularyItem } from '../types';
import { INITIAL_TOPICS } from '../constants';
import { VOCAB_DATA } from '../data/vocabData';
import VocabMatchingGame from '../components/vocab/VocabMatchingGame';
import VocabQuizGame from '../components/vocab/VocabQuizGame';

const VocabTrainer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'selection' | 'list' | 'flashcards' | 'matching' | 'quiz'>('selection');
  
  // Flashcard State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Audio Helper
  const playAudio = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      window.speechSynthesis.cancel(); // Stop previous
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setVocabList([]);
    
    // Simulate slight delay for smooth transition
    setTimeout(() => {
        const data = VOCAB_DATA[topic.id] || [];
        setVocabList(data);
        setLoading(false);
        setMode('list');
    }, 400);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setVocabList([]);
    setMode('selection');
  };

  // --- Render Functions ---

  const renderTopicSelection = () => (
    <div className="animate-fade-in">
       <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">Wortschatz-Trainer</h1>
        <p className="text-lg text-slate-600">Wähle ein Thema, um eine große Vokabelliste zu erhalten und zu üben.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {INITIAL_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => handleTopicSelect(topic)}
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg border border-slate-200 transition-all text-left flex items-center gap-4 hover:-translate-y-1"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{topic.emoji}</span>
            <div>
              <div className="font-bold text-slate-800 group-hover:text-indigo-600">{topic.title}</div>
              <div className="text-xs text-slate-400 mt-1">40 Wörter</div>
            </div>
          </button>
        ))}
      </div>
      {loading && (
        <div className="mt-12 flex flex-col items-center">
           <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
           <p className="text-slate-500 font-medium">Lade Vokabelliste...</p>
        </div>
      )}
    </div>
  );

  const renderFlashcards = () => (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="w-full relative perspective-1000 min-h-[300px]">
          <div className="relative w-full h-full">
            <div 
              className={`w-full bg-white border-2 border-indigo-100 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px] shadow-lg transition-all duration-300 cursor-pointer ${isFlipped ? 'bg-indigo-50 border-indigo-200' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {!isFlipped ? (
                <>
                  <span className="text-xs uppercase font-bold text-indigo-400 mb-4 tracking-widest">Deutsch</span>
                  <div className="flex items-center gap-3 mb-8">
                     <h3 className="text-4xl font-bold text-slate-800">{vocabList[currentCardIndex].word}</h3>
                     <button 
                        onClick={(e) => playAudio(vocabList[currentCardIndex].word, e)}
                        className="p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors"
                        title="Anhören"
                     >
                        <Volume2 className="w-6 h-6" />
                     </button>
                  </div>
                  <div className="mt-auto flex items-center gap-2 text-indigo-500 text-sm font-semibold">
                    <RotateCw className="w-4 h-4" /> Klicken zum Umdrehen
                  </div>
                </>
              ) : (
                <div className="animate-fade-in w-full">
                  <span className="text-xs uppercase font-bold text-slate-400 mb-2 tracking-widest">Übersetzung</span>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-6">{vocabList[currentCardIndex].translation}</h3>
                  
                  <div className="w-16 h-1 bg-indigo-200 mx-auto mb-6 rounded-full"></div>
                  
                  <span className="text-xs uppercase font-bold text-slate-400 mb-2 tracking-widest block">Beispiel</span>
                  <p className="text-slate-700 font-medium italic text-lg leading-snug">
                    "{vocabList[currentCardIndex].example}"
                  </p>
                  <button 
                        onClick={(e) => playAudio(vocabList[currentCardIndex].example, e)}
                        className="mt-4 mx-auto p-2 bg-slate-200 text-slate-600 rounded-full hover:bg-slate-300 transition-colors flex items-center gap-2 text-xs font-bold"
                     >
                        <Volume2 className="w-4 h-4" /> Satz anhören
                  </button>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between w-full mt-8 px-4">
          <button 
          onClick={() => { setIsFlipped(false); setCurrentCardIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length); }}
          className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {currentCardIndex + 1} / {vocabList.length}
          </span>

          <button 
          onClick={() => { setIsFlipped(false); setCurrentCardIndex((prev) => (prev + 1) % vocabList.length); }}
          className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition shadow-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
      </div>
    </div>
  );

  const renderListView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
       {vocabList.map((item, idx) => (
         <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col hover:border-indigo-300 transition-colors">
            <div className="flex justify-between items-start mb-2">
               <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-800">{item.word}</span>
                  <button 
                    onClick={() => playAudio(item.word)}
                    className="text-indigo-400 hover:text-indigo-600 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
               </div>
               <span className="text-slate-500 text-sm italic">{item.translation}</span>
            </div>
            <p className="text-slate-600 text-sm mt-auto border-t border-slate-100 pt-2 flex justify-between items-center">
              <span>
                 <span className="text-slate-400 mr-2">Bsp:</span> 
                 {item.example}
              </span>
              <button 
                    onClick={() => playAudio(item.example)}
                    className="text-slate-300 hover:text-slate-500 transition-colors"
                    title="Satz anhören"
              >
                 <Volume2 className="w-4 h-4" />
              </button>
            </p>
         </div>
       ))}
    </div>
  );

  if (!selectedTopic || mode === 'selection') {
    return renderTopicSelection();
  }

  return (
    <div className="pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
         <div className="flex items-center gap-4">
            <button onClick={handleBackToTopics} className="p-2 hover:bg-slate-100 rounded-lg transition">
              <ChevronLeft className="w-6 h-6 text-slate-500" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedTopic.emoji}</span>
                <h2 className="text-xl font-bold text-slate-900">{selectedTopic.title}</h2>
              </div>
              <p className="text-sm text-slate-500">{vocabList.length} Wörter geladen</p>
            </div>
         </div>

         <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto">
            <button 
              onClick={() => setMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${mode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List className="w-4 h-4" /> Liste
            </button>
            <button 
              onClick={() => setMode('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${mode === 'flashcards' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Layers className="w-4 h-4" /> Flashcards
            </button>
            <button 
              onClick={() => setMode('matching')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${mode === 'matching' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <LayoutGrid className="w-4 h-4" /> Paare finden
            </button>
            <button 
              onClick={() => setMode('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${mode === 'quiz' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <BrainCircuit className="w-4 h-4" /> Quiz
            </button>
         </div>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {mode === 'list' && renderListView()}
        {mode === 'flashcards' && renderFlashcards()}
        {mode === 'matching' && <VocabMatchingGame vocabulary={vocabList} onFinish={() => setMode('list')} />}
        {mode === 'quiz' && <VocabQuizGame vocabulary={vocabList} onFinish={() => setMode('list')} />}
      </div>
    </div>
  );
};

export default VocabTrainer;