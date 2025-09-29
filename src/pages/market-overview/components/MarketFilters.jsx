import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MarketFilters = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    sortBy: 'market_cap',
    sortOrder: 'desc',
    category: 'all',
    priceRange: 'all',
    marketCapRange: 'all',
    changeFilter: 'all'
  });

  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'price', label: 'Price' },
    { value: 'volume', label: '24h Volume' },
    { value: 'price_change_24h', label: '24h Change' },
    { value: 'name', label: 'Name' }
  ];

  const sortOrderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'defi', label: 'DeFi' },
    { value: 'nft', label: 'NFT' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'layer1', label: 'Layer 1' },
    { value: 'layer2', label: 'Layer 2' },
    { value: 'meme', label: 'Meme Coins' },
    { value: 'stablecoin', label: 'Stablecoins' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1', label: 'Under $1' },
    { value: '1-10', label: '$1 - $10' },
    { value: '10-100', label: '$10 - $100' },
    { value: '100-1000', label: '$100 - $1,000' },
    { value: '1000+', label: 'Above $1,000' }
  ];

  const marketCapRangeOptions = [
    { value: 'all', label: 'All Market Caps' },
    { value: '0-1M', label: 'Under $1M' },
    { value: '1M-10M', label: '$1M - $10M' },
    { value: '10M-100M', label: '$10M - $100M' },
    { value: '100M-1B', label: '$100M - $1B' },
    { value: '1B+', label: 'Above $1B' }
  ];

  const changeFilterOptions = [
    { value: 'all', label: 'All Changes' },
    { value: 'positive', label: 'Gainers Only' },
    { value: 'negative', label: 'Losers Only' },
    { value: 'stable', label: 'Stable (±2%)' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      sortBy: 'market_cap',
      sortOrder: 'desc',
      category: 'all',
      priceRange: 'all',
      marketCapRange: 'all',
      changeFilter: 'all'
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t rounded-t-lg shadow-elevation-3 z-50 animate-slide-up md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:bottom-auto md:rounded-lg md:border">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-foreground">Filter & Sort</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto space-y-4">
          {/* Sort Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
            />
            <Select
              label="Sort Order"
              options={sortOrderOptions}
              value={filters?.sortOrder}
              onChange={(value) => handleFilterChange('sortOrder', value)}
            />
          </div>

          {/* Category Filter */}
          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
          />

          {/* Price and Market Cap Ranges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Price Range"
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
            />
            <Select
              label="Market Cap Range"
              options={marketCapRangeOptions}
              value={filters?.marketCapRange}
              onChange={(value) => handleFilterChange('marketCapRange', value)}
            />
          </div>

          {/* Change Filter */}
          <Select
            label="24h Change Filter"
            options={changeFilterOptions}
            value={filters?.changeFilter}
            onChange={(value) => handleFilterChange('changeFilter', value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 border-t bg-muted/30">
          <Button
            variant="outline"
            onClick={handleResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              iconName="Check"
              iconPosition="left"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketFilters;