import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketMetrics = ({ coin }) => {
  const metrics = [
    {
      label: 'Market Cap',
      value: `$${coin?.marketCap?.toLocaleString()}`,
      icon: 'DollarSign',
      change: coin?.marketCapChange24h,
      description: 'Total market value'
    },
    {
      label: '24h Volume',
      value: `$${coin?.volume24h?.toLocaleString()}`,
      icon: 'BarChart3',
      change: coin?.volumeChange24h,
      description: 'Trading volume in 24h'
    },
    {
      label: 'Circulating Supply',
      value: `${coin?.circulatingSupply?.toLocaleString()} ${coin?.symbol}`,
      icon: 'Coins',
      description: 'Coins in circulation'
    },
    {
      label: 'Total Supply',
      value: coin?.totalSupply ? `${coin?.totalSupply?.toLocaleString()} ${coin?.symbol}` : 'N/A',
      icon: 'Database',
      description: 'Total coins that exist'
    },
    {
      label: 'All-Time High',
      value: `$${coin?.allTimeHigh?.toLocaleString()}`,
      icon: 'TrendingUp',
      change: coin?.athChange,
      description: `ATH on ${coin?.athDate}`
    },
    {
      label: 'All-Time Low',
      value: `$${coin?.allTimeLow?.toLocaleString()}`,
      icon: 'TrendingDown',
      change: coin?.atlChange,
      description: `ATL on ${coin?.atlDate}`
    }
  ];

  return (
    <div className="bg-card border rounded-lg p-4 lg:p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Market Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-smooth">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={metric?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{metric?.label}</p>
                  <p className="text-xs text-muted-foreground">{metric?.description}</p>
                </div>
              </div>
              {metric?.change !== undefined && (
                <div className={`flex items-center space-x-1 text-xs ${
                  metric?.change >= 0 ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={metric?.change >= 0 ? "ArrowUp" : "ArrowDown"} 
                    size={12} 
                  />
                  <span>{Math.abs(metric?.change)?.toFixed(2)}%</span>
                </div>
              )}
            </div>
            <p className="text-lg font-bold text-foreground">{metric?.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price Change</p>
            <p className="text-sm font-semibold text-foreground">1h: {coin?.priceChange1h > 0 ? '+' : ''}{coin?.priceChange1h?.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price Change</p>
            <p className="text-sm font-semibold text-foreground">7d: {coin?.priceChange7d > 0 ? '+' : ''}{coin?.priceChange7d?.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Price Change</p>
            <p className="text-sm font-semibold text-foreground">30d: {coin?.priceChange30d > 0 ? '+' : ''}{coin?.priceChange30d?.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Market Dominance</p>
            <p className="text-sm font-semibold text-foreground">{coin?.marketDominance?.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketMetrics;