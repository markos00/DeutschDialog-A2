import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Info, Loader2, PenTool, RefreshCw } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { WritingFeedback, WritingTask } from '../../types';

const ExamWriting: React.FC = () => {
  const [task, setTask] = useState<WritingTask | null>(null);
  const [studentText, setStudentText] = useState('');
  const [feedback, setFeedback] = useState<WritingFeedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);

  const generateTask = useCallback(async () => {
    setLoading(true);
    setTask(null);
    setStudentText('');
    setFeedback(null);
    try {
      const data = await GeminiService.getExamWritingTask();
      setTask(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEvaluate = async () => {
    if (!task || !studentText) return;
    setEvaluating(true);
    try {
      const result = await GeminiService.evaluateExamWriting(task, studentText);
      setFeedback(result);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  useEffect(() => {
    generateTask();
  }, [generateTask]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <PenTool className="w-6 h-6 text-indigo-600" /> Schreiben Training
        </h2>
        <button 
          onClick={generateTask}
          className="text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Neue Aufgabe
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        </div>
      ) : task ? (
        <div className="space-y-6">
          {/* Task Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                 {task.type}
               </span>
               <span className="text-slate-400 text-sm">Ca. 20-30 Wörter</span>
            </div>
            <p className="text-lg text-slate-800 mb-6 font-medium leading-relaxed">
              {task.situation}
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-sm text-slate-500 uppercase font-bold mb-2">Schreiben Sie zu jedem Punkt:</p>
              <ul className="space-y-2">
                {task.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="bg-indigo-200 text-indigo-800 w-5 h-5 flex items-center justify-center rounded-full text-xs flex-shrink-0 mt-0.5">{idx + 1}</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <textarea
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              placeholder="Schreiben Sie hier Ihren Text..."
              rows={6}
              className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleEvaluate}
                disabled={evaluating || !studentText.trim()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {evaluating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                Korrigieren & Bewerten
              </button>
            </div>
          </div>

          {/* Feedback Section */}
          {feedback && (
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg animate-fade-in">
              <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <h3 className="font-bold text-lg">Bewertung</h3>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Punkte:</span>
                  <span className={`font-bold text-xl ${feedback.score >= 6 ? 'text-green-400' : 'text-amber-400'}`}>
                    {feedback.score}/10
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                
                {/* Corrected Text */}
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Korrigierte Version</h4>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-900 font-medium text-lg leading-relaxed">
                    {feedback.correctedText}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Grammar Feedback */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4" /> Grammatik
                    </h4>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm border border-slate-100">
                      {feedback.grammarFeedback}
                    </p>
                  </div>

                  {/* Content Feedback */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Inhalt
                    </h4>
                    <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm border border-slate-100">
                      {feedback.contentFeedback}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ExamWriting;