import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = ({ portfolioData }) => {
  const { totalValue, totalInvested, totalReturn, returnPercentage } = portfolioData;

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Portfolio Summary</h2>
        <Icon name="TrendingUp" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground mb-1">Total Value</p>
          <p className="text-2xl md:text-3xl font-bold text-foreground">${totalValue?.toLocaleString()}</p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
          <p className="text-xl md:text-2xl font-semibold text-foreground">${totalInvested?.toLocaleString()}</p>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground mb-1">Total Return</p>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <p className={`text-xl md:text-2xl font-semibold ${
              totalReturn >= 0 ? 'text-success' : 'text-error'
            }`}>
              ${Math.abs(totalReturn)?.toLocaleString()}
            </p>
            <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              returnPercentage >= 0 
                ? 'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}>
              <Icon 
                name={returnPercentage >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
                className="mr-1" 
              />
              {Math.abs(returnPercentage)?.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;