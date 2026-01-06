import React from 'react';
import { BookOpen, MessageSquare, PenTool } from 'lucide-react';
import { View } from '../types';

interface ExamHubProps {
  onSelectExam: (view: View) => void;
}

const ExamHub: React.FC<ExamHubProps> = ({ onSelectExam }) => {
  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Prüfungstraining <span className="text-indigo-600">Goethe A2</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Bereite dich gezielt auf die Prüfungsteile Schreiben, Lesen und Sprechen vor.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Writing */}
        <button
          onClick={() => onSelectExam(View.EXAM_WRITING)}
          className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <PenTool className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Schreiben</h3>
          <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3">Teil 1 & 2</div>
          <p className="text-slate-600 mb-6">
            SMS und E-Mails schreiben. Du bekommst eine Aufgabe, schreibst den Text und die KI bewertet Grammatik und Inhalt.
          </p>
          <span className="text-indigo-600 font-medium group-hover:underline">Training starten &rarr;</span>
        </button>

        {/* Reading */}
        <button
          onClick={() => onSelectExam(View.EXAM_READING)}
          className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Lesen</h3>
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-3">Teil 2</div>
          <p className="text-slate-600 mb-6">
            Anzeigen, Schilder und kurze Nachrichten verstehen. Lies den Text und beantworte die Multiple-Choice Frage.
          </p>
          <span className="text-emerald-600 font-medium group-hover:underline">Training starten &rarr;</span>
        </button>

        {/* Speaking */}
        <button
          onClick={() => onSelectExam(View.EXAM_SPEAKING)}
          className="group relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left hover:-translate-y-1"
        >
          <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Sprechen</h3>
          <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3">Teil 3</div>
          <p className="text-slate-600 mb-6">
            Gemeinsam etwas planen. Du und dein Lehrer bekommen eine Aufgabe (z.B. Ausflug) und müssen Details aushandeln.
          </p>
          <span className="text-amber-600 font-medium group-hover:underline">Training starten &rarr;</span>
        </button>

      </div>
    </div>
  );
};

export default ExamHub;