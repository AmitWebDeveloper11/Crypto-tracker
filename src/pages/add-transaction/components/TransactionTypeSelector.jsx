import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionTypeSelector = ({ selectedType, onTypeChange }) => {
  const transactionTypes = [
    {
      id: 'buy',
      label: 'Buy',
      description: 'Purchase cryptocurrency',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      id: 'sell',
      label: 'Sell',
      description: 'Sell cryptocurrency',
      icon: 'TrendingDown',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    },
    {
      id: 'transfer',
      label: 'Transfer',
      description: 'Move between wallets',
      icon: 'ArrowLeftRight',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Transaction Type <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {transactionTypes?.map((type) => (
          <button
            key={type?.id}
            type="button"
            onClick={() => onTypeChange(type?.id)}
            className={`relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedType === type?.id
                ? `${type?.bgColor} ${type?.borderColor} shadow-sm`
                : 'bg-card border-border hover:border-muted-foreground/30'
            }`}
          >
            <div className={`p-2 rounded-full mb-2 ${
              selectedType === type?.id ? type?.bgColor : 'bg-muted'
            }`}>
              <Icon 
                name={type?.icon} 
                size={20} 
                className={selectedType === type?.id ? type?.color : 'text-muted-foreground'} 
              />
            </div>
            <span className={`font-medium text-sm ${
              selectedType === type?.id ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {type?.label}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {type?.description}
            </span>
            {selectedType === type?.id && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionTypeSelector;