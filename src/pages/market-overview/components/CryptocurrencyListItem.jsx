import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CryptocurrencyListItem = ({ coin, index }) => {
  const [isWatchlisted, setIsWatchlisted] = useState(coin?.isWatchlisted || false);
  const navigate = useNavigate();

  const handleCoinClick = () => {
    navigate(`/coin-detail?id=${coin?.id}`);
  };

  const handleWatchlistToggle = (e) => {
    e?.stopPropagation();
    setIsWatchlisted(!isWatchlisted);
    console.log(`${isWatchlisted ? 'Removed from' : 'Added to'} watchlist: ${coin?.name}`);
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

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12)?.toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9)?.toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6)?.toFixed(2)}M`;
    return `$${value?.toLocaleString()}`;
  };

  const formatVolume = (value) => {
    if (value >= 1e9) return `$${(value / 1e9)?.toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6)?.toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3)?.toFixed(2)}K`;
    return `$${value?.toLocaleString()}`;
  };

  return (
    <div 
      onClick={handleCoinClick}
      className="flex items-center justify-between p-4 bg-card border-b hover:bg-muted/50 cursor-pointer transition-smooth"
    >
      {/* Left Section - Rank, Logo, Name */}
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className="flex-shrink-0 w-8 text-center">
          <span className="text-sm font-medium text-muted-foreground">
            {index + 1}
          </span>
        </div>
        <div className="flex-shrink-0">
          <Image 
            src={coin?.image} 
            alt={coin?.name}
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-semibold text-foreground truncate">
              {coin?.name}
            </p>
            {coin?.isTrending && (
              <Icon name="TrendingUp" size={12} className="text-warning flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {coin?.symbol?.toUpperCase()}
          </p>
        </div>
      </div>
      {/* Middle Section - Price and Change (Mobile) */}
      <div className="flex flex-col items-end space-y-1 md:hidden">
        <p className="text-sm font-semibold text-foreground">
          ${coin?.currentPrice?.toLocaleString()}
        </p>
        <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
          <Icon name={getChangeIcon()} size={12} />
          <span className="text-xs font-medium">
            {Math.abs(coin?.priceChange24h)?.toFixed(2)}%
          </span>
        </div>
      </div>
      {/* Desktop Layout - Additional Data */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Price */}
        <div className="text-right w-24">
          <p className="text-sm font-semibold text-foreground">
            ${coin?.currentPrice?.toLocaleString()}
          </p>
        </div>

        {/* 24h Change */}
        <div className={`text-right w-20 ${getChangeColor()}`}>
          <div className="flex items-center justify-end space-x-1">
            <Icon name={getChangeIcon()} size={12} />
            <span className="text-sm font-medium">
              {Math.abs(coin?.priceChange24h)?.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Market Cap */}
        <div className="text-right w-20">
          <p className="text-sm text-foreground">
            {formatMarketCap(coin?.marketCap)}
          </p>
        </div>

        {/* Volume */}
        <div className="text-right w-20">
          <p className="text-sm text-muted-foreground">
            {formatVolume(coin?.volume24h)}
          </p>
        </div>

        {/* Sparkline Chart Placeholder */}
        <div className="w-16 h-8 flex items-center justify-center">
          <div className="w-full h-full bg-muted/30 rounded flex items-end justify-center space-x-px">
            {[...Array(8)]?.map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-sm ${
                  coin?.priceChange24h > 0 ? 'bg-success' : 'bg-error'
                }`}
                style={{
                  height: `${Math.random() * 100}%`,
                  minHeight: '2px'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Watchlist Button */}
      <div className="flex-shrink-0 ml-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleWatchlistToggle}
          className="h-8 w-8"
        >
          <Icon 
            name={isWatchlisted ? "Star" : "Star"} 
            size={16} 
            className={isWatchlisted ? "text-warning fill-current" : "text-muted-foreground"}
          />
        </Button>
      </div>
    </div>
  );
};

export default CryptocurrencyListItem;