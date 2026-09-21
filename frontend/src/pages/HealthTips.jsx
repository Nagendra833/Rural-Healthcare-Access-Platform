import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import HealthTipCard from '../components/HealthTipCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFetch } from '../hooks/useFetch';
import { getTips } from '../services/tipService';

const categories = [
  { value: '', label: 'All' },
  { value: 'general', label: 'General' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'maternal_care', label: 'Maternal Care' },
  { value: 'child_healthcare', label: 'Child Healthcare' },
  { value: 'vaccination', label: 'Vaccination' },
];

const HealthTips = () => {
  const [category, setCategory] = useState('');
  const { data, loading } = useFetch(() => getTips(category || undefined), [category]);

  return (
    <DashboardLayout>
      <h2 className="text-lg font-semibold mb-5">Health Tips</h2>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              category === c.value ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {(data?.tips || []).map((tip) => (
            <HealthTipCard key={tip._id} tip={tip} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default HealthTips;
