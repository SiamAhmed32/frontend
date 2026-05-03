import React from 'react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  index: number;
}

export const QuestionCard = ({ 
  question, 
  options, 
  selectedOption, 
  onSelect,
  index 
}: QuestionCardProps) => {
  return (
    <div>
      <div>
        <span>
          {index + 1}
        </span>
        <p>
          {question}
        </p>
      </div>

      <div>
        {options.map((option) => {
          const isSelected = selectedOption === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={cn(
                'flex items-center gap-2 border',
                isSelected && 'font-semibold'
              )}
            >
              <div>
                {isSelected && <div />}
              </div>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
