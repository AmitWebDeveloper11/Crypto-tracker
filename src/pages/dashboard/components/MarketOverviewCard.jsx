import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MarketOverviewCard = ({ marketData }) => {
  const navigate = useNavigate();

  const handleViewMarket = () => {
    navigate('/market-overview');
  };

  const handleCoinClick = (coinId) => {
    navigate(`/coin-detail?id=${coinId}`);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-1 border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Globe" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Market Movers</h3>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleViewMarket}
          className="text-primary hover:text-primary/80"
        >
          View Market
          <Icon name="ExternalLink" size={16} className="ml-1" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Top Gainers
          </h4>
          <div className="space-y-2">
            {marketData?.topGainers?.map((coin) => (
              <div 
                key={coin?.id}
                onClick={() => handleCoinClick(coin?.id)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={coin?.icon}
                    alt={coin?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{coin?.symbol}</span>
                      <span className="text-sm text-muted-foreground">{coin?.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">
                    ${coin?.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm font-medium text-success flex items-center space-x-1">
                    <Icon name="TrendingUp" size={12} />
                    <span>+{coin?.change?.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Top Losers
          </h4>
          <div className="space-y-2">
            {marketData?.topLosers?.map((coin) => (
              <div 
                key={coin?.id}
                onClick={() => handleCoinClick(coin?.id)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={coin?.icon}
                    alt={coin?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{coin?.symbol}</span>
                      <span className="text-sm text-muted-foreground">{coin?.name}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-mono text-foreground">
                    ${coin?.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm font-medium text-error flex items-center space-x-1">
                    <Icon name="TrendingDown" size={12} />
                    <span>{coin?.change?.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t">
        <Button 
          variant="outline" 
          fullWidth
          onClick={handleViewMarket}
          iconName="Globe"
          iconPosition="left"
        >
          Explore Full Market
        </Button>
      </div>
    </div>
  );
};

export default MarketOverviewCard;