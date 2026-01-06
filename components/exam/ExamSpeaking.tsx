import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Loader2, MessageSquare, RefreshCw, Users } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { SpeakingTask } from '../../types';

const ExamSpeaking: React.FC = () => {
  const [task, setTask] = useState<SpeakingTask | null>(null);
  const [loading, setLoading] = useState(false);

  const generateTask = useCallback(async () => {
    setLoading(true);
    setTask(null);
    try {
      const data = await GeminiService.getExamSpeakingTask();
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

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-600" /> Sprechen Training (Teil 3)
        </h2>
        <button 
          onClick={generateTask}
          disabled={loading}
          className="text-sm font-medium text-amber-600 hover:bg-amber-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Neues Szenario
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
        </div>
      ) : task ? (
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-amber-500 text-white rounded-2xl p-6 shadow-md">
             <div className="flex items-start justify-between">
                <div>
                  <div className="text-amber-100 uppercase text-xs font-bold tracking-widest mb-2">Thema</div>
                  <h3 className="text-3xl font-bold mb-2">{task.topic}</h3>
                  <p className="text-lg opacity-90">{task.task}</p>
                </div>
                <Users className="w-12 h-12 opacity-80" />
             </div>
          </div>

          {/* Planning Points */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
             <h4 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
               <Calendar className="w-5 h-5 text-indigo-500" />
               Planen Sie gemeinsam:
             </h4>
             
             <div className="grid sm:grid-cols-2 gap-4">
               {task.pointsToDiscuss.map((point, idx) => (
                 <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-500 shadow-sm flex-shrink-0">
                      ?
                    </div>
                    <span className="font-medium text-slate-800 text-lg">{point}</span>
                 </div>
               ))}
             </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-2">Anleitung für Lehrer & Schüler:</h4>
            <ul className="list-disc list-inside space-y-2 text-blue-800 text-sm">
              <li>Der Schüler macht einen Vorschlag ("Wollen wir am Samstag...?").</li>
              <li>Der Lehrer reagiert (stimmt zu oder lehnt ab).</li>
              <li>Sie müssen am Ende eine Einigung finden für alle Punkte.</li>
              <li>Benutzen Sie Redemittel wie: "Ich schlage vor...", "Das geht leider nicht, weil...", "Das ist eine gute Idee!".</li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExamSpeaking;