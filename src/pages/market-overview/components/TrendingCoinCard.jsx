import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingCoinCard = ({ coin }) => {
  const navigate = useNavigate();

  const handleCoinClick = () => {
    navigate(`/coin-detail?id=${coin?.id}`);
  };

  const getChangeColor = () => {
    if (coin?.priceChange24h > 0) return 'text-success';
    if (coin?.priceChange24h < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (coin?.priceChange24h > 0) return 'TrendingUp';
    if (coin?.priceChange24h < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div 
      onClick={handleCoinClick}
      className="flex-shrink-0 w-32 bg-card border rounded-lg p-3 cursor-pointer hover:shadow-elevation-2 transition-smooth"
    >
      <div className="flex flex-col items-center space-y-2">
        <div className="relative">
          <Image 
            src={coin?.image} 
            alt={coin?.name}
            className="w-8 h-8 rounded-full"
          />
          {coin?.isTrending && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={8} className="text-white" />
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="text-xs font-medium text-foreground truncate w-full">
            {coin?.symbol?.toUpperCase()}
          </p>
          <p className="text-xs text-muted-foreground truncate w-full">
            {coin?.name}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            ${coin?.currentPrice?.toLocaleString()}
          </p>
          <div className={`flex items-center justify-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={10} />
            <span className="text-xs font-medium">
              {Math.abs(coin?.priceChange24h)?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCoinCard;