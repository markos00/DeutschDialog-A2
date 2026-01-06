import React, { useState } from 'react';
import { Check, Eraser, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { GeminiService } from '../services/geminiService';
import { CorrectionResult } from '../types';

const TeacherTools: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<CorrectionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCorrect = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const data = await GeminiService.correctStudentSentence(input);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">Korrektur-Assistent</h1>
        <p className="text-lg text-slate-600">
          Gib einen Satz ein, den dein Schüler gesagt hat. Die KI korrigiert ihn und erklärt die Grammatikregel.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Input Area */}
        <div className="p-6">
          <label htmlFor="studentInput" className="block text-sm font-medium text-slate-700 mb-2">
            Schüler-Antwort (mit Fehler):
          </label>
          <textarea
            id="studentInput"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            placeholder="z.B. Ich habe nach Hause gegangen..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleCorrect();
              }
            }}
          />
          <div className="flex justify-end gap-3 mt-4">
            {input && (
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Eraser className="w-4 h-4" />
                Löschen
              </button>
            )}
            <button
              onClick={handleCorrect}
              disabled={loading || !input.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
              Korrigieren
            </button>
          </div>
        </div>

        {/* Output Area */}
        {result && (
          <div className="border-t border-slate-100 bg-indigo-50/50 animate-fade-in p-6">
             <div className="mb-6">
               <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-100 px-2 py-1 rounded">
                 Korrektur
               </span>
               <p className="mt-3 text-2xl text-slate-800 font-medium">
                 "{result.corrected}"
               </p>
             </div>

             <div className="bg-white p-4 rounded-xl border border-indigo-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-indigo-600 font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Erklärung
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {result.explanation}
                </p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherTools;