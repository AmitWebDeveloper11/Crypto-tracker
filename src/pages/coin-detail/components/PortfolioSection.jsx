import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioSection = ({ coin, userHoldings, onBuyMore, onSell }) => {
  if (!userHoldings) {
    return (
      <div className="bg-card border rounded-lg p-4 lg:p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="PlusCircle" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            You don't own any {coin?.name}
          </h3>
          <p className="text-muted-foreground mb-6">
            Start building your portfolio by purchasing {coin?.symbol}
          </p>
          <Button onClick={onBuyMore} className="w-full sm:w-auto">
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Buy {coin?.symbol}
          </Button>
        </div>
      </div>
    );
  }

  const totalValue = userHoldings?.amount * coin?.currentPrice;
  const profitLoss = totalValue - userHoldings?.totalInvested;
  const profitLossPercentage = ((profitLoss / userHoldings?.totalInvested) * 100);
  const isProfit = profitLoss >= 0;

  return (
    <div className="bg-card border rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Your Holdings</h2>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isProfit 
              ? 'bg-success/10 text-success' :'bg-error/10 text-error'
          }`}>
            {isProfit ? 'Profit' : 'Loss'}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Coins" size={16} className="text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Holdings</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            {userHoldings?.amount?.toFixed(6)} {coin?.symbol}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Current Value</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            ${totalValue?.toLocaleString()}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calculator" size={16} className="text-primary" />
            <p className="text-sm font-medium text-muted-foreground">Avg. Cost</p>
          </div>
          <p className="text-xl font-bold text-foreground">
            ${userHoldings?.averageCost?.toLocaleString()}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={isProfit ? "TrendingUp" : "TrendingDown"} 
              size={16} 
              className={isProfit ? "text-success" : "text-error"} 
            />
            <p className="text-sm font-medium text-muted-foreground">P&L</p>
          </div>
          <div>
            <p className={`text-xl font-bold ${isProfit ? 'text-success' : 'text-error'}`}>
              {isProfit ? '+' : ''}${profitLoss?.toLocaleString()}
            </p>
            <p className={`text-sm ${isProfit ? 'text-success' : 'text-error'}`}>
              {isProfit ? '+' : ''}{profitLossPercentage?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Portfolio Allocation</span>
          <span className="text-sm font-medium text-foreground">
            {userHoldings?.portfolioPercentage?.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(userHoldings?.portfolioPercentage, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {coin?.name} represents {userHoldings?.portfolioPercentage?.toFixed(2)}% of your total portfolio
        </p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button 
          onClick={onBuyMore}
          className="flex-1"
          iconName="Plus"
          iconPosition="left"
        >
          Buy More
        </Button>
        <Button 
          onClick={onSell}
          variant="outline"
          className="flex-1"
          iconName="Minus"
          iconPosition="left"
        >
          Sell
        </Button>
        <Button 
          variant="ghost"
          className="sm:w-auto"
          iconName="Bell"
          iconPosition="left"
        >
          Set Alert
        </Button>
      </div>
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last transaction:</span>
          <span className="text-foreground font-medium">{userHoldings?.lastTransaction}</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;