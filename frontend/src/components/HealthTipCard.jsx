import React from 'react';
import { Leaf } from 'lucide-react';

const categoryLabels = {
  general: 'General',
  nutrition: 'Nutrition',
  maternal_care: 'Maternal Care',
  child_healthcare: 'Child Healthcare',
  vaccination: 'Vaccination',
};

const HealthTipCard = ({ tip }) => {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <Leaf size={16} className="text-primary" />
        </div>
        <span className="text-xs font-medium text-primary bg-accent px-2 py-0.5 rounded-full">
          {categoryLabels[tip.category] || 'General'}
        </span>
      </div>
      <h4 className="font-semibold mb-1">{tip.title}</h4>
      <p className="text-sm text-gray-600">{tip.content}</p>
    </div>
  );
};

export default HealthTipCard;
