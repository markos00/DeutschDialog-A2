import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, RefreshCw, Scale, ThumbsUp } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { WouldYouRatherScenario } from '../../types';

const WouldYouRatherGame: React.FC = () => {
  const [scenario, setScenario] = useState<WouldYouRatherScenario | null>(null);
  const [loading, setLoading] = useState(false);

  const generateScenario = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GeminiService.getWouldYouRather();
      setScenario(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateScenario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Würdest du lieber...?</h2>
        <p className="text-slate-600">Entscheide dich für eine Option und begründe mit "weil...".</p>
      </div>

      <div className="relative min-h-[400px] flex flex-col">
        {loading && (
           <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
             <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-3" />
                <span className="text-indigo-900 font-medium text-lg">Suche schwierige Entscheidung...</span>
             </div>
           </div>
        )}

        {scenario ? (
          <div className="flex-1 grid md:grid-cols-2 gap-6 relative">
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 shadow-xl border-4 border-slate-100 hidden md:block">
               <div className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center font-black text-xl">
                 VS
               </div>
            </div>
            
            {/* Option A */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center items-center text-center transform hover:scale-[1.02] transition-transform duration-300">
               <div className="bg-white/20 p-4 rounded-full mb-6">
                 <ThumbsUp className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-3xl font-bold leading-tight mb-4">{scenario.optionA}</h3>
               <div className="mt-auto pt-6 opacity-80 font-medium">Option A</div>
            </div>

            <div className="md:hidden flex justify-center items-center py-2">
                <span className="bg-slate-200 text-slate-600 px-4 py-1 rounded-full font-bold">ODER</span>
            </div>

            {/* Option B */}
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-center items-center text-center transform hover:scale-[1.02] transition-transform duration-300">
               <div className="bg-white/20 p-4 rounded-full mb-6">
                 <Scale className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-3xl font-bold leading-tight mb-4">{scenario.optionB}</h3>
               <div className="mt-auto pt-6 opacity-80 font-medium">Option B</div>
            </div>
          </div>
        ) : !loading && (
             <div className="flex-1 flex items-center justify-center bg-slate-100 rounded-3xl">
                <p>Klicke auf Generieren, um zu starten.</p>
             </div>
        )}
        
        {/* Footer Action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={generateScenario}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-600 rounded-2xl hover:bg-indigo-50 transition-all font-bold text-lg shadow-sm hover:shadow-lg"
          >
            <RefreshCw className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
            Neue Frage
          </button>
        </div>
        
        <div className="mt-6 text-center text-slate-500 text-sm">
          💡 Tipp: Benutze Sätze wie "Ich würde lieber..., weil..." oder "Für mich ist ... besser, denn..."
        </div>
      </div>
    </div>
  );
};

export default WouldYouRatherGame;