import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CoinHeader = ({ coin }) => {
  const isPositive = coin?.priceChange24h >= 0;

  return (
    <div className="bg-card border-b p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={coin?.image}
              alt={`${coin?.name} logo`}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full"
            />
            <button className="absolute -top-1 -right-1 w-6 h-6 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-smooth">
              <Icon 
                name={coin?.isWatchlisted ? "Star" : "Star"} 
                size={14} 
                className={coin?.isWatchlisted ? "text-warning fill-current" : "text-muted-foreground"}
              />
            </button>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">{coin?.name}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span className="text-sm lg:text-base font-medium">{coin?.symbol}</span>
              <span className="text-xs">#{coin?.marketCapRank}</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl lg:text-3xl font-bold text-foreground">
            ${coin?.currentPrice?.toLocaleString()}
          </div>
          <div className={`flex items-center justify-end space-x-1 text-sm lg:text-base ${
            isPositive ? 'text-success' : 'text-error'
          }`}>
            <Icon 
              name={isPositive ? "TrendingUp" : "TrendingDown"} 
              size={16} 
            />
            <span>{isPositive ? '+' : ''}{coin?.priceChange24h?.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinHeader;