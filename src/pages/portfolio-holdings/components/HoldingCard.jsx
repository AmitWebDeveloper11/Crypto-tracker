import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HoldingCard = ({ holding }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const {
    id,
    name,
    symbol,
    icon,
    quantity,
    currentPrice,
    currentValue,
    costBasis,
    averagePrice,
    profitLoss,
    profitLossPercentage,
    portfolioPercentage
  } = holding;

  const handleCoinDetail = () => {
    navigate(`/coin-detail?id=${id}`);
  };

  const handleBuyMore = () => {
    navigate('/add-transaction', { state: { coinId: id, type: 'buy' } });
  };

  const handleSell = () => {
    navigate('/add-transaction', { state: { coinId: id, type: 'sell' } });
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1 mb-3 overflow-hidden">
      {/* Main Card Content */}
      <div 
        className="p-4 cursor-pointer hover:bg-muted/50 transition-smooth"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={icon}
                alt={`${name} icon`}
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-bold">
                  {Math.round(portfolioPercentage)}%
                </span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-foreground">{name}</h3>
                <span className="text-sm text-muted-foreground">{symbol}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {quantity} {symbol}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-semibold text-foreground">
              ${currentValue?.toLocaleString()}
            </p>
            <div className={`flex items-center justify-end space-x-1 text-sm ${
              profitLoss >= 0 ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={profitLoss >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>
                ${Math.abs(profitLoss)?.toLocaleString()} ({Math.abs(profitLossPercentage)?.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>${currentPrice?.toLocaleString()}</span>
            <span>Avg: ${averagePrice?.toLocaleString()}</span>
          </div>
          
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            className="text-muted-foreground"
          />
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t bg-muted/30 p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Cost Basis</p>
              <p className="font-medium text-foreground">${costBasis?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Portfolio Weight</p>
              <p className="font-medium text-foreground">{portfolioPercentage?.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Current Price</p>
              <p className="font-medium text-foreground">${currentPrice?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Average Price</p>
              <p className="font-medium text-foreground">${averagePrice?.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCoinDetail}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={handleBuyMore}
              iconName="Plus"
              iconPosition="left"
              className="flex-1"
            >
              Buy More
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleSell}
              iconName="Minus"
              iconPosition="left"
              className="flex-1"
            >
              Sell
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HoldingCard;