import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioValueCard = ({ totalValue, dailyChange, dailyChangePercent }) => {
  const isPositive = dailyChange >= 0;
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-1 border">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-medium text-muted-foreground">Total Portfolio Value</h2>
        <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold text-foreground">
          ${totalValue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
            isPositive 
              ? 'bg-success/10 text-success' :'bg-error/10 text-error'
          }`}>
            <Icon 
              name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
              size={14} 
              strokeWidth={2.5}
            />
            <span>
              {isPositive ? '+' : ''}${Math.abs(dailyChange)?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          
          <span className={`text-sm font-medium ${
            isPositive ? 'text-success' : 'text-error'
          }`}>
            ({isPositive ? '+' : ''}{dailyChangePercent?.toFixed(2)}%)
          </span>
          
          <span className="text-xs text-muted-foreground">24h</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioValueCard;