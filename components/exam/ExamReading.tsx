import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Check, X, Loader2, ArrowRight } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { ReadingTask } from '../../types';

const ExamReading: React.FC = () => {
  const [task, setTask] = useState<ReadingTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'a' | 'b' | 'c' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const generateTask = useCallback(async () => {
    setLoading(true);
    setTask(null);
    setSelectedAnswer(null);
    setShowResult(false);
    try {
      const data = await GeminiService.getExamReadingTask();
      setTask(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateTask();
  }, [generateTask]);

  const handleSelect = (key: 'a' | 'b' | 'c') => {
    if (showResult) return;
    setSelectedAnswer(key);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-emerald-600" /> Lesen Training
        </h2>
        <div className="text-sm text-slate-500">Teil 2: Anzeigen & Emails</div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
          <p className="text-slate-500">Suche geeigneten Text...</p>
        </div>
      ) : task ? (
        <div className="space-y-8">
          {/* Text Display */}
          <div className="bg-white border-2 border-slate-200 rounded-xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 bg-slate-200 text-slate-600 px-3 py-1 text-xs font-bold uppercase rounded-br-lg">
              Lesetext
            </div>
            <p className="text-xl font-medium text-slate-800 leading-loose font-serif mt-4">
              "{task.text}"
            </p>
          </div>

          {/* Question & Options */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">{task.question}</h3>
            <div className="space-y-3">
              {(['a', 'b', 'c'] as const).map((key) => {
                let cardClass = "bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50";
                let icon = null;

                if (selectedAnswer === key) {
                  cardClass = "bg-emerald-100 border-emerald-500 ring-1 ring-emerald-500";
                }

                if (showResult) {
                  if (key === task.correctAnswer) {
                     cardClass = "bg-green-100 border-green-500 text-green-900";
                     icon = <Check className="w-5 h-5 text-green-600" />;
                  } else if (key === selectedAnswer && key !== task.correctAnswer) {
                     cardClass = "bg-red-100 border-red-500 text-red-900";
                     icon = <X className="w-5 h-5 text-red-600" />;
                  } else {
                     cardClass = "bg-slate-50 border-slate-200 opacity-50";
                  }
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${cardClass}`}
                  >
                    <span className="font-medium text-lg"><span className="font-bold mr-2 uppercase">{key})</span> {task.options[key]}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-4">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                disabled={!selectedAnswer}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Überprüfen
              </button>
            ) : (
              <button
                onClick={generateTask}
                className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition shadow-md flex items-center gap-2"
              >
                Nächste Aufgabe <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExamReading;