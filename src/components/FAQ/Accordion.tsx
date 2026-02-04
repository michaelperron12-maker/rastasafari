'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

interface AccordionProps {
  categories: FAQCategory[];
}

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-green-200 last:border-b-0">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 transition-colors duration-200"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-800 pr-4">{question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-600 text-white transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

interface AccordionCategoryProps {
  category: FAQCategory;
  openIndex: number | null;
  onItemClick: (index: number) => void;
  categoryIndex: number;
}

const AccordionCategory = ({
  category,
  openIndex,
  onItemClick,
  categoryIndex,
}: AccordionCategoryProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{category.icon}</span>
        <h2 className="text-2xl font-bold text-green-800">{category.title}</h2>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
        {category.items.map((item, index) => {
          const globalIndex = categoryIndex * 100 + index;
          return (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === globalIndex}
              onClick={() => onItemClick(globalIndex)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function Accordion({ categories }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {categories.map((category, categoryIndex) => (
        <AccordionCategory
          key={categoryIndex}
          category={category}
          openIndex={openIndex}
          onItemClick={handleItemClick}
          categoryIndex={categoryIndex}
        />
      ))}
    </div>
  );
}

export type { FAQItem, FAQCategory, AccordionProps };
