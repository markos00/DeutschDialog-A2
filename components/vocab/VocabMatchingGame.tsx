import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { VocabularyItem } from '../../types';

interface VocabMatchingGameProps {
  vocabulary: VocabularyItem[];
  onFinish: () => void;
}

type CardState = 'default' | 'selected' | 'matched' | 'mismatch';

interface GameCard {
  id: string;
  text: string;
  type: 'word' | 'translation';
  matchId: string; // The ID of the matching card (conceptually the same word)
  state: CardState;
}

const VocabMatchingGame: React.FC<VocabMatchingGameProps> = ({ vocabulary, onFinish }) => {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Take random 8 words to make 16 cards (8 pairs)
    // If vocabulary is less than 8, use all.
    const subset = [...vocabulary].sort(() => 0.5 - Math.random()).slice(0, 8);
    
    const newCards: GameCard[] = [];
    subset.forEach((item, index) => {
      // German Card
      newCards.push({
        id: `de-${index}`,
        text: item.word,
        type: 'word',
        matchId: `en-${index}`,
        state: 'default'
      });
      // English Card
      newCards.push({
        id: `en-${index}`,
        text: item.translation,
        type: 'translation',
        matchId: `de-${index}`,
        state: 'default'
      });
    });

    // Shuffle cards
    setCards(newCards.sort(() => 0.5 - Math.random()));
  }, [vocabulary]);

  const handleCardClick = (clickedCard: GameCard) => {
    if (isProcessing || clickedCard.state === 'matched' || clickedCard.state === 'selected') return;

    // Update state to selected
    const updatedCards = cards.map(c => c.id === clickedCard.id ? { ...c, state: 'selected' as CardState } : c);
    setCards(updatedCards);

    const newSelection = [...selectedCards, clickedCard];
    setSelectedCards(newSelection);

    if (newSelection.length === 2) {
      setIsProcessing(true);
      const [card1, card2] = newSelection;
      
      const isMatch = card1.matchId === card2.id || card2.matchId === card1.id; // actually simplified logic: we know the pairings

      // Wait a bit to show result
      setTimeout(() => {
        setCards(currentCards => 
          currentCards.map(c => {
            if (c.id === card1.id || c.id === card2.id) {
               return { ...c, state: isMatch ? 'matched' : 'default' };
            }
            return c;
          })
        );
        setSelectedCards([]);
        setIsProcessing(false);
      }, isMatch ? 500 : 1000);
      
      if (!isMatch) {
         // Show mismatch temporarily
         setCards(currentCards => 
            currentCards.map(c => {
               if (c.id === card1.id || c.id === card2.id) {
                  return { ...c, state: 'mismatch' };
               }
               return c;
            })
         );
      }
    }
  };

  const matchedCount = cards.filter(c => c.state === 'matched').length;
  const isComplete = matchedCount === cards.length && cards.length > 0;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-slate-800">Paare finden</h3>
        <p className="text-slate-500">Klicke auf das deutsche Wort und die passende Übersetzung.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map(card => {
          let baseClass = "h-24 p-2 rounded-xl border-2 flex items-center justify-center text-center text-sm sm:text-base font-medium transition-all cursor-pointer transform hover:scale-[1.02] shadow-sm";
          
          if (card.state === 'default') baseClass += " bg-white border-slate-200 hover:border-indigo-300 text-slate-700";
          if (card.state === 'selected') baseClass += " bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md ring-2 ring-indigo-200";
          if (card.state === 'matched') baseClass += " bg-emerald-50 border-emerald-500 text-emerald-700 opacity-60 scale-95 cursor-default";
          if (card.state === 'mismatch') baseClass += " bg-red-50 border-red-500 text-red-700 animate-shake";

          return (
            <div 
              key={card.id} 
              onClick={() => handleCardClick(card)}
              className={baseClass}
            >
              {card.state === 'matched' && <Check className="w-4 h-4 mr-1 inline" />}
              {card.text}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="mt-8 text-center animate-fade-in">
           <div className="inline-block p-4 bg-emerald-100 rounded-full text-emerald-600 mb-4">
             <Check className="w-8 h-8" />
           </div>
           <h3 className="text-2xl font-bold text-slate-800 mb-2">Gut gemacht!</h3>
           <button 
             onClick={onFinish}
             className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
           >
             Zurück zur Übersicht
           </button>
        </div>
      )}
    </div>
  );
};

export default VocabMatchingGame;