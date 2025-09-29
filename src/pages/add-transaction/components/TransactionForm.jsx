import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const TransactionForm = ({ 
  selectedCrypto, 
  transactionType, 
  quantity, 
  setQuantity, 
  pricePerUnit, 
  setPricePerUnit, 
  transactionDate, 
  setTransactionDate, 
  notes, 
  setNotes, 
  onSubmit, 
  isLoading 
}) => {
  const [totalValue, setTotalValue] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    setTotalValue(qty * price);
  }, [quantity, pricePerUnit]);

  const validateForm = () => {
    const newErrors = {};

    if (!selectedCrypto) {
      newErrors.cryptocurrency = 'Please select a cryptocurrency';
    }

    if (!transactionType) {
      newErrors.transactionType = 'Please select a transaction type';
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (!pricePerUnit || parseFloat(pricePerUnit) <= 0) {
      newErrors.pricePerUnit = 'Please enter a valid price';
    }

    if (!transactionDate) {
      newErrors.transactionDate = 'Please select a transaction date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const handleQuantityChange = (e) => {
    const value = e?.target?.value;
    // Allow decimal numbers
    if (value === '' || /^\d*\.?\d*$/?.test(value)) {
      setQuantity(value);
    }
  };

  const handlePriceChange = (e) => {
    const value = e?.target?.value;
    // Allow decimal numbers
    if (value === '' || /^\d*\.?\d*$/?.test(value)) {
      setPricePerUnit(value);
    }
  };

  const getCurrentPrice = () => {
    if (selectedCrypto) {
      setPricePerUnit(selectedCrypto?.price?.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Quantity Input */}
      <div className="space-y-3">
        <Input
          label="Quantity"
          type="text"
          placeholder="0.00000000"
          value={quantity}
          onChange={handleQuantityChange}
          error={errors?.quantity}
          required
          description={selectedCrypto ? `Amount of ${selectedCrypto?.symbol} to ${transactionType}` : undefined}
          className="font-mono"
        />
      </div>
      {/* Price Per Unit Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            Price per Unit (USD) <span className="text-error">*</span>
          </label>
          {selectedCrypto && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={getCurrentPrice}
              className="text-xs"
            >
              <Icon name="RefreshCw" size={14} className="mr-1" />
              Use Current Price
            </Button>
          )}
        </div>
        <Input
          type="text"
          placeholder="0.00"
          value={pricePerUnit}
          onChange={handlePriceChange}
          error={errors?.pricePerUnit}
          required
          description={selectedCrypto ? `Current market price: $${selectedCrypto?.price?.toLocaleString()}` : undefined}
          className="font-mono"
        />
      </div>
      {/* Total Value Display */}
      {totalValue > 0 && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Value</span>
            <span className="text-lg font-bold font-mono text-foreground">
              ${totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          {selectedCrypto && (
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-muted-foreground">
                {quantity} {selectedCrypto?.symbol} × ${parseFloat(pricePerUnit)?.toLocaleString()}
              </span>
              <span className={`font-medium ${
                transactionType === 'buy' ? 'text-error' : transactionType === 'sell' ? 'text-success' : 'text-muted-foreground'
              }`}>
                {transactionType === 'buy' ? '-' : transactionType === 'sell' ? '+' : ''}${totalValue?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      )}
      {/* Transaction Date */}
      <div className="space-y-3">
        <Input
          label="Transaction Date"
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e?.target?.value)}
          error={errors?.transactionDate}
          required
          max={new Date()?.toISOString()?.split('T')?.[0]}
          description="Date when the transaction occurred"
        />
      </div>
      {/* Notes */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Notes (Optional)
        </label>
        <textarea
          placeholder="Add any additional notes about this transaction..."
          value={notes}
          onChange={(e) => setNotes(e?.target?.value)}
          rows={3}
          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm"
        />
      </div>
      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          disabled={!selectedCrypto || !transactionType || !quantity || !pricePerUnit || !transactionDate}
          iconName="Plus"
          iconPosition="left"
        >
          {isLoading ? 'Adding Transaction...' : 'Add Transaction'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;