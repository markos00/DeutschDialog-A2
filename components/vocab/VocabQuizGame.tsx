import React, { useState } from 'react';
import { ArrowRight, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { VocabularyItem } from '../../types';

interface VocabQuizGameProps {
  vocabulary: VocabularyItem[];
  onFinish: () => void;
}

const VocabQuizGame: React.FC<VocabQuizGameProps> = ({ vocabulary, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  // Create questions on init
  const [questions] = useState(() => {
    // Shuffle vocabulary
    const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
    // Take max 10 words
    return shuffled.slice(0, 10).map(item => {
      // Find 3 distractors
      const distractors = vocabulary
        .filter(v => v.word !== item.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(v => v.translation);
      
      const options = [...distractors, item.translation].sort(() => 0.5 - Math.random());
      
      return {
        word: item.word,
        correct: item.translation,
        example: item.example,
        options
      };
    });
  });

  const currentQ = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    if (option === currentQ.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentIndex(idx => idx + 1);
  };

  if (isFinished) {
    return (
      <div className="text-center py-10">
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Quiz beendet!</h3>
        <p className="text-xl text-slate-600 mb-8">
          Du hast <span className="font-bold text-indigo-600">{score}</span> von <span className="font-bold">{questions.length}</span> richtig.
        </p>
        <button 
          onClick={onFinish}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium"
        >
          Zurück zur Liste
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-8 text-sm font-medium text-slate-500">
         <span>Frage {currentIndex + 1} von {questions.length}</span>
         <span>Score: {score}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-6">
         <div className="bg-indigo-600 p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-2">{currentQ.word}</h2>
            <div className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Was bedeutet das?</div>
         </div>
         
         <div className="p-6 grid gap-3">
            {currentQ.options.map((opt, idx) => {
               let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center ";
               
               if (showResult) {
                  if (opt === currentQ.correct) {
                     btnClass += "bg-emerald-50 border-emerald-500 text-emerald-800";
                  } else if (opt === selectedOption) {
                     btnClass += "bg-red-50 border-red-500 text-red-800";
                  } else {
                     btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-50";
                  }
               } else {
                  btnClass += "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700";
               }

               return (
                  <button 
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    disabled={showResult}
                    className={btnClass}
                  >
                     {opt}
                     {showResult && opt === currentQ.correct && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                     {showResult && opt === selectedOption && opt !== currentQ.correct && <XCircle className="w-5 h-5 text-red-600" />}
                  </button>
               );
            })}
         </div>

         {showResult && (
            <div className="px-6 pb-6 pt-0 animate-fade-in">
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase mb-1">
                     <HelpCircle className="w-3 h-3" /> Beispiel
                  </div>
                  <p className="text-slate-700 italic">"{currentQ.example}"</p>
               </div>
               <button 
                  onClick={handleNext}
                  className="w-full py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition flex items-center justify-center gap-2 font-bold"
               >
                  Weiter <ArrowRight className="w-4 h-4" />
               </button>
            </div>
         )}
      </div>
    </div>
  );
};

export default VocabQuizGame;