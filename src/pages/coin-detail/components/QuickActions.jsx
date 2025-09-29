import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ coin, onBuyMore, onSell, onAddToWatchlist, onSetAlert }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertPrice, setAlertPrice] = useState('');
  const [alertType, setAlertType] = useState('above');

  const handleSetAlert = () => {
    if (alertPrice) {
      onSetAlert({
        coinId: coin?.id,
        price: parseFloat(alertPrice),
        type: alertType,
        coinName: coin?.name,
        coinSymbol: coin?.symbol
      });
      setShowAlertModal(false);
      setAlertPrice('');
    }
  };

  return (
    <>
      <div className="bg-card border rounded-lg p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button 
            onClick={onBuyMore}
            className="h-16 flex-col space-y-1"
            iconName="ShoppingCart"
          >
            <span className="text-xs">Buy More</span>
          </Button>

          <Button 
            onClick={onSell}
            variant="outline"
            className="h-16 flex-col space-y-1"
            iconName="Minus"
          >
            <span className="text-xs">Sell</span>
          </Button>

          <Button 
            onClick={onAddToWatchlist}
            variant="ghost"
            className="h-16 flex-col space-y-1"
            iconName={coin?.isWatchlisted ? "Star" : "Star"}
          >
            <span className="text-xs">
              {coin?.isWatchlisted ? 'Watchlisted' : 'Watchlist'}
            </span>
          </Button>

          <Button 
            onClick={() => setShowAlertModal(true)}
            variant="ghost"
            className="h-16 flex-col space-y-1"
            iconName="Bell"
          >
            <span className="text-xs">Set Alert</span>
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Live Price Updates</span>
            </div>
            <span className="text-muted-foreground">
              Last updated: {new Date()?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      {/* Price Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-foreground">Set Price Alert</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAlertModal(false)}
                className="h-8 w-8"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Alert when {coin?.symbol} price goes:
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setAlertType('above')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-smooth ${
                      alertType === 'above' ?'bg-primary text-primary-foreground border-primary' :'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    Above
                  </button>
                  <button
                    onClick={() => setAlertType('below')}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-smooth ${
                      alertType === 'below' ?'bg-primary text-primary-foreground border-primary' :'bg-background text-foreground border-border hover:bg-muted'
                    }`}
                  >
                    Below
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Target Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={alertPrice}
                    onChange={(e) => setAlertPrice(e?.target?.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current price: ${coin?.currentPrice?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex space-x-3 p-4 border-t">
              <Button
                variant="outline"
                onClick={() => setShowAlertModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSetAlert}
                disabled={!alertPrice}
                className="flex-1"
              >
                Set Alert
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;