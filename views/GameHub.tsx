import React from 'react';
import { BookOpen, Gamepad2, Mic2, Scale, Users } from 'lucide-react';
import { View } from '../types';

interface GameHubProps {
  onSelectGame: (view: View) => void;
}

const GameHub: React.FC<GameHubProps> = ({ onSelectGame }) => {
  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-3">Sprachspiele für Zwei</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Wähle eine Aktivität, um spielerisch Wortschatz und Sprechen zu üben.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        
        {/* Tabu Game Card */}
        <button
          onClick={() => onSelectGame(View.GAME_TABOO)}
          className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left flex flex-col"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Gamepad2 className="w-24 h-24" />
          </div>
          <div className="p-8 flex-grow">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Mic2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">Wörter erklären</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Der Klassiker "Tabu". Beschreibe deinem Lehrer ein Wort, ohne die verbotenen Begriffe zu nutzen. Dann wird gewechselt.
            </p>
          </div>
          <div className="px-8 pb-8 pt-0">
             <div className="inline-flex items-center text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Jetzt spielen &rarr;
            </div>
          </div>
        </button>

        {/* Role Play Game Card */}
        <button
          onClick={() => onSelectGame(View.GAME_ROLEPLAY)}
          className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left flex flex-col"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24" />
          </div>
          <div className="p-8 flex-grow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">Rollenspiel Roulette</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Zufällige Alltagssituationen. Du bist Rolle A, dein Lehrer ist Rolle B (oder umgekehrt). Spontanes Sprechen üben.
            </p>
          </div>
          <div className="px-8 pb-8 pt-0">
             <div className="inline-flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Jetzt spielen &rarr;
            </div>
          </div>
        </button>

        {/* Would You Rather Game Card */}
        <button
          onClick={() => onSelectGame(View.GAME_WOULD_YOU_RATHER)}
          className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left flex flex-col"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Scale className="w-24 h-24" />
          </div>
          <div className="p-8 flex-grow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">Würdest du lieber...?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Eine Entscheidung, zwei Optionen. Erzähle mir, was du wählen würdest und warum.
            </p>
          </div>
          <div className="px-8 pb-8 pt-0">
             <div className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Jetzt spielen &rarr;
            </div>
          </div>
        </button>

        {/* Story Game Card (NEW) */}
        <button
          onClick={() => onSelectGame(View.GAME_STORY)}
          className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 text-left flex flex-col"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BookOpen className="w-24 h-24" />
          </div>
          <div className="p-8 flex-grow">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">Geschichten-Erzähler</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Wir erfinden gemeinsam eine Geschichte. Jeder darf abwechselnd einen Satz sagen.
            </p>
          </div>
          <div className="px-8 pb-8 pt-0">
             <div className="inline-flex items-center text-orange-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Jetzt spielen &rarr;
            </div>
          </div>
        </button>

      </div>
    </div>
  );
};

export default GameHub;