import React, { useState } from 'react';
import { Check, X, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';
import { GrammarExerciseData } from '../../data/grammarData';

interface Props {
  data: GrammarExerciseData;
  onComplete: () => void;
}

const GrammarExercise: React.FC<Props> = ({ data, onComplete }) => {
  const [answers, setAnswers] = useState<string[]>(new Array(data.questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    let newScore = 0;
    data.questions.forEach((q, idx) => {
      if (answers[idx].trim().toLowerCase() === q.answer.toLowerCase()) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  const reset = () => {
    setAnswers(new Array(data.questions.length).fill(''));
    setShowResults(false);
    setScore(0);
  };

  const isPerfect = score === data.questions.length;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-indigo-600 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">{data.title}</h3>
          <p className="text-indigo-100">{data.description}</p>
        </div>

        <div className="p-6 space-y-6">
          {data.questions.map((q, idx) => {
            const parts = q.text.split('___');
            const isCorrect = answers[idx].trim().toLowerCase() === q.answer.toLowerCase();
            
            return (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-lg text-slate-700">
                  <span className="font-bold text-slate-400 text-sm w-6">{idx + 1}.</span>
                  
                  {/* Sentence Construction */}
                  <div className="flex-grow flex flex-wrap items-center gap-2">
                    <span>{parts[0]}</span>
                    
                    {data.type === 'choice' && q.options ? (
                      <div className="flex gap-1">
                        {q.options.map(opt => (
                          <button
                            key={opt}
                            disabled={showResults}
                            onClick={() => handleInputChange(idx, opt)}
                            className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all ${
                              answers[idx] === opt
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-600 border-slate-300 hover:border-indigo-400'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        disabled={showResults}
                        value={answers[idx]}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        className={`border-b-2 bg-slate-50 px-2 py-0.5 outline-none focus:border-indigo-500 min-w-[100px] text-center font-medium transition-colors ${
                          showResults 
                            ? isCorrect 
                              ? 'border-emerald-500 text-emerald-700 bg-emerald-50' 
                              : 'border-red-400 text-red-600 bg-red-50'
                            : 'border-slate-300 text-indigo-900'
                        }`}
                        placeholder="..."
                      />
                    )}
                    
                    <span>{parts[1]}</span>
                  </div>

                  {/* Feedback Icon */}
                  {showResults && (
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <Check className="w-6 h-6 text-emerald-500" />
                      ) : (
                        <div className="group relative">
                           <X className="w-6 h-6 text-red-500 cursor-help" />
                           <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                             Lösung: {q.answer}
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {q.hint && !showResults && (
                  <div className="ml-9 text-xs text-slate-400 italic flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> {q.hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
          {!showResults ? (
            <button
              onClick={checkAnswers}
              className="ml-auto bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-indigo-700 transition shadow-md flex items-center gap-2"
            >
              Überprüfen <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <>
              <div className="font-bold text-slate-700">
                Ergebnis: <span className={isPerfect ? "text-emerald-600" : "text-indigo-600"}>{score}</span> / {data.questions.length}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg font-medium flex items-center gap-2 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Wiederholen
                </button>
                <button
                  onClick={onComplete}
                  className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-900 transition shadow-md"
                >
                  Zurück zur Übersicht
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrammarExercise;