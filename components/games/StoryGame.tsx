import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Feather, Loader2, RefreshCw } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { StoryStarter } from '../../types';

const StoryGame: React.FC = () => {
  const [story, setStory] = useState<StoryStarter | null>(null);
  const [loading, setLoading] = useState(false);

  const generateStory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await GeminiService.getStoryStarter();
      setStory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    generateStory();
  }, [generateStory]);

  return (
    <div className="max-w-3xl mx-auto">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">Geschichten-Erzähler</h2>
        <p className="text-slate-600">Wir schreiben gemeinsam eine Geschichte. Jeder sagt abwechselnd einen Satz.</p>
      </div>

      <div className="relative">
        {loading && (
           <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl">
             <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-3" />
                <span className="text-indigo-900 font-medium text-lg">Suche Inspiration...</span>
             </div>
           </div>
        )}

        {story ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Genre Header */}
            <div className="bg-orange-500 text-white px-6 py-3 flex justify-between items-center">
              <span className="font-bold uppercase tracking-wider text-sm">Genre</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">{story.genre}</span>
            </div>

            <div className="p-8 md:p-12 text-center space-y-8">
              {/* The Starting Sentence */}
              <div>
                <p className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-4">Der Anfang</p>
                <div className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed font-medium">
                  "{story.sentence}"
                </div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              {/* Mandatory Words */}
              <div>
                <p className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-4">
                  Diese Wörter müssen vorkommen:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.words.map((word, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-orange-50 text-orange-800 px-4 py-2 rounded-lg border border-orange-100 font-medium">
                       <Feather className="w-4 h-4" />
                       {word}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center">
              <button
                onClick={generateStory}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 hover:text-orange-600 hover:border-orange-300 rounded-xl hover:bg-orange-50 transition-all font-medium shadow-sm hover:shadow-md"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Neue Geschichte starten
              </button>
            </div>
          </div>
        ) : null}
      </div>

       <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          Anleitung:
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-slate-600 ml-2">
          <li>Lest den Anfangssatz gemeinsam.</li>
          <li>Der Schüler beginnt mit dem nächsten Satz (im Perfekt oder Präteritum).</li>
          <li>Dann ist der Lehrer dran.</li>
          <li>Versucht, die 3 Wörter logisch einzubauen.</li>
        </ol>
      </div>
    </div>
  );
};

export default StoryGame;