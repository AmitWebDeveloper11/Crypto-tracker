import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  onApplyFilters 
}) => {
  const transactionTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'buy', label: 'Buy' },
    { value: 'sell', label: 'Sell' },
    { value: 'transfer', label: 'Transfer' }
  ];

  const cryptocurrencyOptions = [
    { value: '', label: 'All Cryptocurrencies' },
    { value: 'bitcoin', label: 'Bitcoin (BTC)' },
    { value: 'ethereum', label: 'Ethereum (ETH)' },
    { value: 'cardano', label: 'Cardano (ADA)' },
    { value: 'solana', label: 'Solana (SOL)' },
    { value: 'polkadot', label: 'Polkadot (DOT)' },
    { value: 'chainlink', label: 'Chainlink (LINK)' }
  ];

  const amountRangeOptions = [
    { value: '', label: 'Any Amount' },
    { value: '0-100', label: '$0 - $100' },
    { value: '100-1000', label: '$100 - $1,000' },
    { value: '1000-10000', label: '$1,000 - $10,000' },
    { value: '10000+', label: '$10,000+' }
  ];

  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t rounded-t-lg max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-foreground">Filter Transactions</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          <div className="p-4 space-y-4">
            <FilterContent 
              filters={filters}
              onInputChange={handleInputChange}
              transactionTypeOptions={transactionTypeOptions}
              cryptocurrencyOptions={cryptocurrencyOptions}
              amountRangeOptions={amountRangeOptions}
            />
            
            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={onClearFilters} className="flex-1">
                Clear All
              </Button>
              <Button onClick={onApplyFilters} className="flex-1">
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80 bg-card border rounded-lg p-6 h-fit sticky top-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Filter Transactions</h3>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Clear All
          </Button>
        </div>
        
        <div className="space-y-4">
          <FilterContent 
            filters={filters}
            onInputChange={handleInputChange}
            transactionTypeOptions={transactionTypeOptions}
            cryptocurrencyOptions={cryptocurrencyOptions}
            amountRangeOptions={amountRangeOptions}
          />
          
          <Button onClick={onApplyFilters} className="w-full mt-6">
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

const FilterContent = ({ 
  filters, 
  onInputChange, 
  transactionTypeOptions, 
  cryptocurrencyOptions, 
  amountRangeOptions 
}) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input
        label="From Date"
        type="date"
        value={filters?.fromDate}
        onChange={(e) => onInputChange('fromDate', e?.target?.value)}
      />
      <Input
        label="To Date"
        type="date"
        value={filters?.toDate}
        onChange={(e) => onInputChange('toDate', e?.target?.value)}
      />
    </div>

    <Select
      label="Transaction Type"
      options={transactionTypeOptions}
      value={filters?.type}
      onChange={(value) => onInputChange('type', value)}
    />

    <Select
      label="Cryptocurrency"
      options={cryptocurrencyOptions}
      value={filters?.cryptocurrency}
      onChange={(value) => onInputChange('cryptocurrency', value)}
      searchable
    />

    <Select
      label="Amount Range"
      options={amountRangeOptions}
      value={filters?.amountRange}
      onChange={(value) => onInputChange('amountRange', value)}
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input
        label="Min Amount ($)"
        type="number"
        placeholder="0"
        value={filters?.minAmount}
        onChange={(e) => onInputChange('minAmount', e?.target?.value)}
      />
      <Input
        label="Max Amount ($)"
        type="number"
        placeholder="No limit"
        value={filters?.maxAmount}
        onChange={(e) => onInputChange('maxAmount', e?.target?.value)}
      />
    </div>

    <Input
      label="Search Notes"
      type="text"
      placeholder="Search in transaction notes..."
      value={filters?.notes}
      onChange={(e) => onInputChange('notes', e?.target?.value)}
    />
  </>
);

export default FilterPanel;