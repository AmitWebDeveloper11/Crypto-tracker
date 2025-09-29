import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TopHoldingsCard = ({ holdings }) => {
  const navigate = useNavigate();

  const handleViewAllHoldings = () => {
    navigate('/portfolio-holdings');
  };

  const handleCoinClick = (coinId) => {
    navigate(`/coin-detail?id=${coinId}`);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-1 border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="PieChart" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Top Holdings</h3>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleViewAllHoldings}
          className="text-primary hover:text-primary/80"
        >
          View All
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>
      <div className="space-y-4">
        {holdings?.map((holding, index) => {
          const isPositive = holding?.change >= 0;
          
          return (
            <div 
              key={holding?.id}
              onClick={() => handleCoinClick(holding?.id)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={holding?.icon}
                    alt={holding?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute -top-1 -left-1 w-5 h-5 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{holding?.name}</span>
                    <span className="text-sm text-muted-foreground">{holding?.symbol}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {holding?.amount} {holding?.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">
                  ${holding?.value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`text-sm font-medium flex items-center justify-end space-x-1 ${
                  isPositive ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span>
                    {isPositive ? '+' : ''}{holding?.change?.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t">
        <Button 
          variant="outline" 
          fullWidth
          onClick={handleViewAllHoldings}
          iconName="PieChart"
          iconPosition="left"
        >
          View Complete Portfolio
        </Button>
      </div>
    </div>
  );
};

export default TopHoldingsCard;