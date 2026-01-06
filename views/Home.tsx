import React from 'react';
import { View } from '../types';
import { BookOpen, Gamepad2 } from 'lucide-react';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-8 p-4 bg-yellow-100 rounded-full inline-block animate-bounce-slow">
        <span className="text-6xl">🇩🇪</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Deutsch üben <span className="text-indigo-600">im 1:1 Gespräch</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
        Willkommen bei <b>DeutschDialog A2</b>. Dein digitaler Assistent für den privaten Deutschunterricht. Themen, Spiele und Korrekturen für Lehrer und Schüler.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <button
          onClick={() => onNavigate(View.TOPICS)}
          className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <BookOpen className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Gesprächsthemen</h2>
          <p className="text-slate-500">
            Spannende Fragen und Vokabeln für euer Gespräch.
          </p>
        </button>

        <button
          onClick={() => onNavigate(View.GAMES)}
          className="group flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg border border-slate-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-4 bg-pink-50 text-pink-600 rounded-full mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Aktivitäten</h2>
          <p className="text-slate-500">
            Rollenspiele, Tabu und Storytelling für zwei.
          </p>
        </button>
      </div>
    </div>
  );
};

export default Home;