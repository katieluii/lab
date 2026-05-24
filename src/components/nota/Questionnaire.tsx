import { useState } from 'react';
import { QUESTIONS, type QuestionOption } from '../../data/nota-questionnaire';

export function Questionnaire({ onComplete }: { onComplete: (selected: QuestionOption[]) => void }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedByQ, setSelectedByQ] = useState<Record<string, Set<string>>>({});

  const question = QUESTIONS[currentQ];
  const selected = selectedByQ[question.id] ?? new Set<string>();
  const isLast = currentQ === QUESTIONS.length - 1;
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  function toggle(optId: string) {
    const next = new Set(selected);
    if (!question.multiSelect) { next.clear(); next.add(optId); }
    else { next.has(optId) ? next.delete(optId) : next.add(optId); }
    setSelectedByQ(prev => ({ ...prev, [question.id]: next }));
  }

  function advance() {
    if (!selected.size) return;
    if (isLast) {
      const all: QuestionOption[] = [];
      for (const q of QUESTIONS) {
        const ids = selectedByQ[q.id] ?? new Set<string>();
        for (const opt of q.options) if (ids.has(opt.id)) all.push(opt);
      }
      onComplete(all);
    } else {
      setCurrentQ(q => q + 1);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-500">Question {currentQ + 1} of {QUESTIONS.length}</span>
          <span className="font-medium" style={{ color: '#6B2D3E' }}>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: '#6B2D3E' }} />
        </div>
      </div>

      <h2 className="font-playfair text-2xl font-semibold text-zinc-900 mb-1 leading-tight">
        {question.question}
      </h2>
      {question.subtext && <p className="text-zinc-500 text-sm mb-6">{question.subtext}</p>}

      <div className="space-y-2.5">
        {question.options.map(opt => {
          const isSelected = selected.has(opt.id);
          return (
            <button
              key={opt.id}
              onClick={() => toggle(opt.id)}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                isSelected ? 'border-[#6B2D3E] bg-[#6B2D3E]/5' : 'border-zinc-100 bg-white hover:border-[#6B2D3E]/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{opt.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${isSelected ? 'text-[#6B2D3E]' : 'text-zinc-800'}`}>{opt.label}</p>
                  {opt.description && <p className="text-xs text-zinc-400 mt-0.5">{opt.description}</p>}
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#6B2D3E' }}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={() => setCurrentQ(q => q - 1)}
          className={`text-sm text-zinc-400 hover:text-zinc-700 transition-colors ${currentQ === 0 ? 'invisible' : ''}`}
        >
          ← Back
        </button>
        <button
          onClick={advance}
          disabled={!selected.size}
          className={`font-medium px-7 py-2.5 rounded-xl text-white transition-all ${
            selected.size ? 'hover:opacity-90 cursor-pointer' : 'opacity-30 cursor-not-allowed'
          }`}
          style={{ backgroundColor: '#6B2D3E' }}
        >
          {isLast ? 'Find my concerts →' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
