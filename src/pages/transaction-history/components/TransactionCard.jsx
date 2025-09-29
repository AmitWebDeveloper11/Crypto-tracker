import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionCard = ({ transaction, onEdit, onDelete, isSelected, onSelect }) => {
  const getTransactionIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'buy':
        return 'ArrowDownLeft';
      case 'sell':
        return 'ArrowUpRight';
      case 'transfer':
        return 'ArrowLeftRight';
      default:
        return 'ArrowLeftRight';
    }
  };

  const getTransactionColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'buy':
        return 'text-success';
      case 'sell':
        return 'text-error';
      case 'transfer':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-card border rounded-lg p-4 transition-smooth hover:shadow-elevation-1 ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Selection Checkbox */}
          <div className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(transaction?.id, e?.target?.checked)}
              className="h-4 w-4 text-primary border-border rounded focus:ring-primary"
            />
          </div>

          {/* Transaction Icon */}
          <div className={`flex-shrink-0 p-2 rounded-lg bg-muted ${getTransactionColor(transaction?.type)}`}>
            <Icon name={getTransactionIcon(transaction?.type)} size={20} />
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {transaction?.type} {transaction?.cryptocurrency}
              </h3>
              <span className="text-sm font-mono text-foreground">
                ${transaction?.totalValue?.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{transaction?.quantity} {transaction?.symbol}</span>
              <span>${transaction?.price?.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {formatDate(transaction?.date)} at {formatTime(transaction?.date)}
              </span>
              {transaction?.fees > 0 && (
                <span className="text-muted-foreground">
                  Fee: ${transaction?.fees?.toFixed(2)}
                </span>
              )}
            </div>

            {transaction?.notes && (
              <p className="text-xs text-muted-foreground mt-2 truncate">
                {transaction?.notes}
              </p>
            )}
          </div>
        </div>

        {/* Action Menu */}
        <div className="flex items-center space-x-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(transaction)}
            className="h-8 w-8"
          >
            <Icon name="Edit" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(transaction?.id)}
            className="h-8 w-8 text-error hover:text-error"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;