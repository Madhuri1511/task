import React, { useState, useEffect } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: {
    year: string;
    rating: string;
    language: string;
  }) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [currentFilters, setCurrentFilters] = useState({
    year: '',
    rating: '',
    language: '',
  });

  useEffect(() => {
    const resetFilters = () => {
      setCurrentFilters({
        year: '',
        rating: '',
        language: '',
      });
    };

    const handleClearFilters = () => {
      resetFilters();
    };

    window.addEventListener('clearFilters', handleClearFilters);

    return () => {
      window.removeEventListener('clearFilters', handleClearFilters);
    };
  }, []);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 24 }, (_, i) => currentYear - i);
  
  const ratings = [
    { value: '', label: 'Any Rating' },
    { value: '9', label: '9+ Stars' },
    { value: '8', label: '8+ Stars' },
    { value: '7', label: '7+ Stars' },
    { value: '6', label: '6+ Stars' },
    { value: '5', label: '5+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '1', label: '1+ Stars' },
  ];

  const languages = [
    { value: '', label: 'Any Language' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const newFilters = {
      ...currentFilters,
      [name]: value,
    };
    
    setCurrentFilters(newFilters);
    
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        name="year"
        value={currentFilters.year}
        onChange={handleChange}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
      >
        <option value="">Any Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        name="rating"
        value={currentFilters.rating}
        onChange={handleChange}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
      >
        {ratings.map((rating) => (
          <option key={rating.value} value={rating.value}>
            {rating.label}
          </option>
        ))}
      </select>

      <select
        name="language"
        value={currentFilters.language}
        onChange={handleChange}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}; 