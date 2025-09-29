import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import TransactionTypeSelector from './components/TransactionTypeSelector';
import CryptocurrencySelector from './components/CryptocurrencySelector';
import TransactionForm from './components/TransactionForm';
import SuccessModal from './components/SuccessModal';

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form state
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [transactionType, setTransactionType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [transactionDate, setTransactionDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedTransaction, setSubmittedTransaction] = useState(null);

  // Check if opened from a specific crypto (e.g., from coin detail page)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cryptoId = urlParams?.get('crypto');
    const type = urlParams?.get('type');
    
    if (cryptoId && type) {
      // Mock crypto data - in real app this would come from API
      const mockCrypto = {
        id: cryptoId,
        name: cryptoId === 'bitcoin' ? 'Bitcoin' : 'Ethereum',
        symbol: cryptoId === 'bitcoin' ? 'BTC' : 'ETH',
        price: cryptoId === 'bitcoin' ? 43250.00 : 2680.00,
        change: '+2.5%',
        icon: `https://cryptologos.cc/logos/${cryptoId}-${cryptoId === 'bitcoin' ? 'btc' : 'eth'}-logo.png`
      };
      
      setSelectedCrypto(mockCrypto);
      setTransactionType(type);
      setPricePerUnit(mockCrypto?.price?.toString());
    }
  }, [location?.search]);

  const handlePriceUpdate = (price) => {
    setPricePerUnit(price?.toString());
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const transactionData = {
      id: Date.now()?.toString(),
      cryptocurrency: selectedCrypto,
      transactionType,
      quantity: parseFloat(quantity),
      pricePerUnit: parseFloat(pricePerUnit),
      totalValue: parseFloat(quantity) * parseFloat(pricePerUnit),
      transactionDate,
      notes,
      timestamp: new Date()?.toISOString()
    };
    
    setSubmittedTransaction(transactionData);
    setIsLoading(false);
    setShowSuccessModal(true);
  };

  const handleAddAnother = () => {
    // Reset form
    setSelectedCrypto(null);
    setTransactionType('');
    setQuantity('');
    setPricePerUnit('');
    setTransactionDate(new Date()?.toISOString()?.split('T')?.[0]);
    setNotes('');
    setShowSuccessModal(false);
    setSubmittedTransaction(null);
  };

  const handleBackToPortfolio = () => {
    setShowSuccessModal(false);
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      <BottomTabNavigation />
      
      <div className="pb-20 md:pb-6">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoBack}
                className="h-10 w-10"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Add Transaction</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Record your cryptocurrency transactions to track your portfolio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-card rounded-lg border shadow-elevation-1 p-6">
            <div className="space-y-8">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    selectedCrypto ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    1
                  </div>
                  <span className={selectedCrypto ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    Select Crypto
                  </span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    transactionType ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    2
                  </div>
                  <span className={transactionType ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    Transaction Type
                  </span>
                </div>
                <div className="flex-1 h-px bg-border mx-4"></div>
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    quantity && pricePerUnit ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    3
                  </div>
                  <span className={quantity && pricePerUnit ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                    Details
                  </span>
                </div>
              </div>

              {/* Cryptocurrency Selection */}
              <CryptocurrencySelector
                selectedCrypto={selectedCrypto}
                onCryptoChange={setSelectedCrypto}
                onPriceUpdate={handlePriceUpdate}
              />

              {/* Transaction Type Selection */}
              <TransactionTypeSelector
                selectedType={transactionType}
                onTypeChange={setTransactionType}
              />

              {/* Transaction Form */}
              {selectedCrypto && transactionType && (
                <div className="border-t pt-8">
                  <TransactionForm
                    selectedCrypto={selectedCrypto}
                    transactionType={transactionType}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    pricePerUnit={pricePerUnit}
                    setPricePerUnit={setPricePerUnit}
                    transactionDate={transactionDate}
                    setTransactionDate={setTransactionDate}
                    notes={notes}
                    setNotes={setNotes}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-2">Quick Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the current market price for accurate portfolio tracking</li>
                  <li>• Add notes to remember important transaction details</li>
                  <li>• Double-check quantities to avoid calculation errors</li>
                  <li>• Set the correct date for historical transactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleBackToPortfolio}
        transactionData={submittedTransaction}
        onAddAnother={handleAddAnother}
      />

      <FloatingActionButton />
    </div>
  );
};

export default AddTransaction;