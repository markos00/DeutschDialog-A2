import React, { useState } from 'react';
import { Book, ChevronRight, Menu } from 'lucide-react';
import { GRAMMAR_REFERENCE_CONTENT, TopicSection } from '../../data/grammarData';

const CATEGORIES = [
  { id: 'nomen', label: 'Nomen & Artikel' },
  { id: 'pronomen', label: 'Pronomen' },
  { id: 'verben', label: 'Verben & Zeiten' },
  { id: 'satzbau', label: 'Satzbau' },
  { id: 'praepositionen', label: 'Präpositionen & Adjektive' },
];

const GrammarReference: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('nomen');
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentTopics = GRAMMAR_REFERENCE_CONTENT[activeCategory] || [];
  const currentTopicData = currentTopics[activeTopicIndex];

  // --- Render Helpers ---

  const renderTable = (content: any, idx: number) => (
    <div key={idx} className="mb-8 overflow-x-auto">
      {content.description && <h4 className="font-bold text-slate-700 mb-2">{content.description}</h4>}
      <table className="w-full text-sm text-left border-collapse min-w-[300px]">
        <thead>
          <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
            {content.headers?.map((h: string, i: number) => (
              <th key={i} className="p-3 font-semibold" dangerouslySetInnerHTML={{ __html: h }} />
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-800">
          {content.data.map((row: string[], rIdx: number) => (
            <tr key={rIdx} className="border-b border-slate-50 hover:bg-slate-50">
              {row.map((cell, cIdx) => (
                <td 
                  key={cIdx} 
                  className="p-3 border-r border-slate-50 last:border-0"
                  dangerouslySetInnerHTML={{ __html: cell }} // Allows <b> and <span> tags from data
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderList = (content: any, idx: number) => (
    <div key={idx} className="mb-8 bg-indigo-50/50 p-5 rounded-xl border border-indigo-100">
      {content.description && <h4 className="font-bold text-indigo-900 mb-3">{content.description}</h4>}
      <ul className="space-y-2">
        {content.data.map((item: string, i: number) => (
          <li key={i} className="flex gap-2 items-start text-slate-700">
            <span className="text-indigo-500 font-bold mt-1">•</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </div>
  );

  const renderText = (content: any, idx: number) => (
    <div key={idx} className="mb-6 text-slate-700 leading-relaxed text-lg border-l-4 border-indigo-300 pl-4">
      <p dangerouslySetInnerHTML={{ __html: content.data }} />
    </div>
  );

  const renderSentenceStructure = (content: any, idx: number) => (
    <div key={idx} className="mb-8">
      {content.description && <h4 className="font-bold text-slate-700 mb-3">{content.description}</h4>}
      <div className="grid gap-3">
        {content.data.map((s: any, i: number) => (
           <div key={i} className="flex flex-col sm:flex-row bg-slate-50 border border-slate-200 rounded-lg overflow-hidden text-sm">
              <div className="bg-slate-200 p-2 text-slate-500 font-bold w-full sm:w-24 border-b sm:border-b-0 sm:border-r border-slate-300 flex items-center justify-center">
                 {s.type}
              </div>
              <div className="flex-1 grid grid-cols-4 divide-x divide-slate-200">
                 <div className="p-3 text-center">
                    <span className="block text-xs text-slate-400 uppercase font-bold mb-1">Pos 1</span>
                    {s.pos1}
                 </div>
                 <div className="p-3 text-center bg-blue-50/50">
                    <span className="block text-xs text-blue-400 uppercase font-bold mb-1">Verb 1</span>
                    <span className="font-bold text-blue-800">{s.verb1}</span>
                 </div>
                 <div className="p-3 text-center col-span-1">
                    <span className="block text-xs text-slate-400 uppercase font-bold mb-1">Mittelfeld</span>
                    {s.mid}
                 </div>
                 <div className="p-3 text-center bg-blue-50/50">
                    <span className="block text-xs text-blue-400 uppercase font-bold mb-1">Verb 2 / Ende</span>
                    <span className="font-bold text-blue-800">{s.verb2}</span>
                 </div>
              </div>
           </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[600px] items-start">
      
      {/* Mobile Toggle */}
      <button 
        className="lg:hidden w-full bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between font-bold text-slate-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <span>Thema wählen</span>
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Navigation */}
      <div className={`
        lg:w-1/4 w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all
        ${isSidebarOpen ? 'block' : 'hidden lg:block'}
      `}>
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="border-b border-slate-100 last:border-0">
            <button
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveTopicIndex(0);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left p-4 font-bold text-sm uppercase tracking-wider transition-colors ${
                activeCategory === cat.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
            
            {activeCategory === cat.id && (
              <div className="bg-slate-50/50">
                {GRAMMAR_REFERENCE_CONTENT[cat.id]?.map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTopicIndex(idx);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left px-6 py-3 text-sm flex items-center justify-between group transition-all ${
                      activeTopicIndex === idx 
                        ? 'text-indigo-600 font-bold bg-white border-l-4 border-indigo-600' 
                        : 'text-slate-600 border-l-4 border-transparent hover:bg-slate-100'
                    }`}
                  >
                    {topic.title}
                    {activeTopicIndex === idx && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="lg:w-3/4 w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 animate-fade-in">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 border-b-2 border-slate-100 pb-4">
          {currentTopicData?.title}
        </h2>

        <div>
          {currentTopicData?.content.map((block, idx) => {
            switch (block.type) {
              case 'text': return renderText(block, idx);
              case 'table': return renderTable(block, idx);
              case 'list': return renderList(block, idx);
              case 'sentence-structure': return renderSentenceStructure(block, idx);
              default: return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default GrammarReference;