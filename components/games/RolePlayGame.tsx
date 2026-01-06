import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, MessageSquareQuote, RefreshCw, User, Users } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { RolePlayScenario } from '../../types';

const RolePlayGame: React.FC = () => {
  const [scenario, setScenario] = useState<RolePlayScenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'scenario' | 'phrases'>('scenario');

  const generateScenario = useCallback(async () => {
    setLoading(true);
    setActiveTab('scenario'); // Reset tab to scenario when generating new one
    try {
      const data = await GeminiService.getRolePlayScenario();
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
    <div className="max-w-3xl mx-auto">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Rollenspiel Generator</h2>
        <p className="text-slate-600">Übt spontane Gespräche in Alltagssituationen.</p>
      </div>

      <div className="relative">
        {loading && (
           <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
             <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-2" />
                <span className="text-indigo-900 font-medium">Erfinde Szenario...</span>
             </div>
           </div>
        )}

        {scenario && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-2xl font-bold mb-1">{scenario.title}</h3>
                   <p className="opacity-90">{scenario.situation}</p>
                </div>
                <Users className="w-8 h-8 opacity-80" />
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('scenario')}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === 'scenario'
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-slate-50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                Szenario & Rollen
              </button>
              <button
                onClick={() => setActiveTab('phrases')}
                className={`flex-1 py-4 text-center font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === 'phrases'
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-slate-50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MessageSquareQuote className="w-4 h-4" /> Redemittel
              </button>
            </div>

            <div className="min-h-[300px]">
              {activeTab === 'scenario' ? (
                <>
                  {/* Roles */}
                  <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    {/* Role A */}
                    <div className="p-6 bg-slate-50/50">
                       <div className="flex items-center gap-2 mb-3 text-teal-700">
                         <User className="w-5 h-5" />
                         <h4 className="font-bold uppercase tracking-wider text-sm">Rolle A</h4>
                       </div>
                       <p className="text-slate-800 text-lg leading-relaxed">{scenario.roleA}</p>
                    </div>

                    {/* Role B */}
                    <div className="p-6 bg-slate-50/50">
                       <div className="flex items-center gap-2 mb-3 text-emerald-700">
                         <User className="w-5 h-5" />
                         <h4 className="font-bold uppercase tracking-wider text-sm">Rolle B</h4>
                       </div>
                       <p className="text-slate-800 text-lg leading-relaxed">{scenario.roleB}</p>
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="p-6 border-t border-slate-200 bg-yellow-50/50">
                    <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                      🎯 Ziel des Gesprächs
                    </h4>
                    <p className="text-slate-700">{scenario.goal}</p>
                  </div>
                </>
              ) : (
                /* Phrases Content */
                <div className="p-8 bg-slate-50/30">
                  <h4 className="font-bold text-slate-800 mb-4 text-lg">Nützliche Sätze für dieses Gespräch:</h4>
                  <ul className="space-y-3">
                    {scenario.phrases.map((phrase, idx) => (
                      <li key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="bg-teal-100 text-teal-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700 text-lg">{phrase}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-slate-500 text-center italic">
                    Tipp: Versuche mindestens 3 dieser Sätze im Gespräch zu benutzen!
                  </p>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-white border-t border-slate-200 flex justify-center sticky bottom-0 z-10">
              <button
                onClick={generateScenario}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 rounded-xl hover:bg-indigo-50 transition-all font-medium shadow-sm hover:shadow-md"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Neues Szenario generieren
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePlayGame;