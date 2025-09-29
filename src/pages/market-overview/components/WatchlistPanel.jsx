import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WatchlistPanel = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [watchlistCoins, setWatchlistCoins] = useState([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      currentPrice: 43250.00,
      priceChange24h: 2.5,
      alertPrice: 45000,
      hasAlert: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      currentPrice: 2680.00,
      priceChange24h: -1.2,
      alertPrice: null,
      hasAlert: false
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      currentPrice: 0.52,
      priceChange24h: 5.8,
      alertPrice: 0.60,
      hasAlert: true
    }
  ]);

  const handleRemoveFromWatchlist = (coinId) => {
    setWatchlistCoins(prev => prev?.filter(coin => coin?.id !== coinId));
    console.log(`Removed ${coinId} from watchlist`);
  };

  const handleCoinClick = (coinId) => {
    navigate(`/coin-detail?id=${coinId}`);
    onClose();
  };

  const handleSetAlert = (coinId) => {
    console.log(`Setting alert for ${coinId}`);
    // In a real app, this would open an alert configuration modal
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      {/* Watchlist Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l shadow-elevation-3 z-50 animate-slide-left">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Watchlist</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {watchlistCoins?.length > 0 ? (
            <div className="p-4 space-y-3">
              {watchlistCoins?.map((coin) => (
                <div
                  key={coin?.id}
                  className="bg-muted/30 rounded-lg p-3 border hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      onClick={() => handleCoinClick(coin?.id)}
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      <Image 
                        src={coin?.image} 
                        alt={coin?.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {coin?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {coin?.symbol?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFromWatchlist(coin?.id)}
                      className="h-6 w-6 text-muted-foreground hover:text-error"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        ${coin?.currentPrice?.toLocaleString()}
                      </p>
                      <div className={`flex items-center space-x-1 ${getChangeColor(coin?.priceChange24h)}`}>
                        <Icon name={getChangeIcon(coin?.priceChange24h)} size={10} />
                        <span className="text-xs font-medium">
                          {Math.abs(coin?.priceChange24h)?.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {coin?.hasAlert && (
                        <div className="flex items-center space-x-1 text-warning">
                          <Icon name="Bell" size={12} />
                          <span className="text-xs">${coin?.alertPrice}</span>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSetAlert(coin?.id)}
                        className="h-6 w-6"
                      >
                        <Icon 
                          name="Bell" 
                          size={12} 
                          className={coin?.hasAlert ? "text-warning" : "text-muted-foreground"}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Icon name="Star" size={48} className="mb-4 opacity-50" />
              <p className="text-center">Your watchlist is empty</p>
              <p className="text-xs text-center mt-1">
                Add cryptocurrencies to track their prices
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t bg-muted/30">
          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              navigate('/market-overview');
              onClose();
            }}
            iconName="Plus"
            iconPosition="left"
          >
            Add More Coins
          </Button>
        </div>
      </div>
    </>
  );
};

export default WatchlistPanel;