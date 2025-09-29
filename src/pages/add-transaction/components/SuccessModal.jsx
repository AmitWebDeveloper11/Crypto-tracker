import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const SuccessModal = ({ isOpen, onClose, transactionData, onAddAnother }) => {
  if (!isOpen || !transactionData) return null;

  const { cryptocurrency, transactionType, quantity, pricePerUnit, totalValue, transactionDate } = transactionData;

  const getTransactionIcon = () => {
    switch (transactionType) {
      case 'buy':
        return { name: 'TrendingUp', color: 'text-success' };
      case 'sell':
        return { name: 'TrendingDown', color: 'text-error' };
      case 'transfer':
        return { name: 'ArrowLeftRight', color: 'text-accent' };
      default:
        return { name: 'Check', color: 'text-success' };
    }
  };

  const transactionIcon = getTransactionIcon();

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4">
        <div className="bg-card border rounded-lg shadow-elevation-3 animate-scale-in">
          {/* Header */}
          <div className="text-center p-6 border-b">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Transaction Added Successfully!
            </h2>
            <p className="text-sm text-muted-foreground">
              Your {transactionType} transaction has been recorded
            </p>
          </div>

          {/* Transaction Details */}
          <div className="p-6 space-y-4">
            {/* Cryptocurrency Info */}
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Image
                src={cryptocurrency?.icon}
                alt={cryptocurrency?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="font-medium text-foreground">{cryptocurrency?.name}</div>
                <div className="text-sm text-muted-foreground">{cryptocurrency?.symbol}</div>
              </div>
              <div className={`p-2 rounded-full bg-card ${transactionIcon?.color}`}>
                <Icon name={transactionIcon?.name} size={16} />
              </div>
            </div>

            {/* Transaction Summary */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Transaction Type</span>
                <span className="font-medium text-foreground capitalize">{transactionType}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <span className="font-mono font-medium text-foreground">
                  {quantity} {cryptocurrency?.symbol}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Price per Unit</span>
                <span className="font-mono font-medium text-foreground">
                  ${parseFloat(pricePerUnit)?.toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm font-medium text-foreground">Total Value</span>
                <span className="font-mono font-bold text-lg text-foreground">
                  ${totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">
                  {new Date(transactionDate)?.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 pt-0 space-y-3">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={onAddAnother}
              iconName="Plus"
              iconPosition="left"
            >
              Add Another Transaction
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onClose}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Portfolio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;