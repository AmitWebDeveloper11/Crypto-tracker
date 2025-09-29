import React from 'react';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Holdings' },
    { id: 'performance', label: 'By Performance' },
    { id: 'alphabetical', label: 'A-Z' },
    { id: 'portfolio-percentage', label: 'By Weight' },
    { id: 'value', label: 'By Value' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters?.map((filter) => (
        <Button
          key={filter?.id}
          variant={activeFilter === filter?.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter?.id)}
          className="text-xs"
        >
          {filter?.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterChips;