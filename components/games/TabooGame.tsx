import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, ArrowRight, Loader2, RefreshCw, Timer } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { TabooCard } from '../../types';

const TabooGame: React.FC = () => {
  const [card, setCard] = useState<TabooCard | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const loadNewCard = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRevealed(false);
    try {
      const newCard = await GeminiService.getTabooCard();
      setCard(newCard);
    } catch (err) {
      console.error(err);
      setError("Fehler beim Laden der Karte. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadNewCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Wörter erklären</h2>
        <p className="text-slate-600">Erkläre das Wort deinem Partner, ohne die verbotenen Wörter zu nutzen!</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 min-h-[400px] flex flex-col relative">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <p className="text-slate-500 animate-pulse">Generiere neue Karte...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-slate-700 mb-6">{error}</p>
            <button
              onClick={loadNewCard}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Erneut versuchen
            </button>
          </div>
        ) : card ? (
          <div className="flex-1 flex flex-col">
            {/* Top Section: Target Word */}
            <div className="bg-indigo-600 p-8 text-center">
              <h3 className="text-3xl font-bold text-white tracking-wide uppercase">
                {card.word}
              </h3>
            </div>

            {/* Middle Section: Forbidden Words (Hidden initially) */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center bg-slate-50">
              <div className="w-full max-w-xs">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-4">
                  Verbotene Wörter
                </div>
                
                <div className={`space-y-3 transition-all duration-500 ${revealed ? 'opacity-100 blur-0' : 'opacity-40 blur-sm select-none'}`}>
                  {card.forbidden.map((word, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-center font-medium text-slate-700 shadow-sm">
                      {word}
                    </div>
                  ))}
                </div>

                {!revealed && (
                  <button
                    onClick={() => setRevealed(true)}
                    className="absolute inset-x-0 bottom-32 mx-auto w-48 py-2 bg-white/90 backdrop-blur border border-indigo-200 text-indigo-600 rounded-full shadow-lg font-semibold hover:bg-indigo-50 transition transform hover:-translate-y-1"
                  >
                    Aufdecken
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="p-4 bg-white border-t border-slate-100 flex justify-between items-center">
               <div className="flex items-center text-slate-400 text-sm gap-1">
                 <Timer className="w-4 h-4"/>
                 <span>Zeit läuft?</span>
               </div>
               <button
                onClick={loadNewCard}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium shadow-md hover:shadow-lg"
               >
                 Nächste Karte <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
        <p className="font-semibold mb-1">💡 Spielregeln:</p>
        <ul className="list-disc list-inside space-y-1 ml-1 opacity-90">
          <li>Du erklärst, dein Lehrer/Partner rät.</li>
          <li>Die 3 unteren Wörter sind tabu.</li>
          <li>Danach wird gewechselt!</li>
        </ul>
      </div>
    </div>
  );
};

export default TabooGame;