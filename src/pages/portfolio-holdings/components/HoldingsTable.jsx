import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HoldingsTable = ({ holdings, sortConfig, onSort }) => {
  const navigate = useNavigate();

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig?.key === key && sortConfig?.direction === 'ascending') {
      direction = 'descending';
    }
    onSort({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'ascending' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const handleCoinDetail = (id) => {
    navigate(`/coin-detail?id=${id}`);
  };

  const handleBuyMore = (id) => {
    navigate('/add-transaction', { state: { coinId: id, type: 'buy' } });
  };

  const handleSell = (id) => {
    navigate('/add-transaction', { state: { coinId: id, type: 'sell' } });
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-smooth"
                >
                  <span>Asset</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('quantity')}
                  className="flex items-center justify-end space-x-2 hover:text-primary transition-smooth w-full"
                >
                  <span>Holdings</span>
                  {getSortIcon('quantity')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('currentPrice')}
                  className="flex items-center justify-end space-x-2 hover:text-primary transition-smooth w-full"
                >
                  <span>Price</span>
                  {getSortIcon('currentPrice')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('currentValue')}
                  className="flex items-center justify-end space-x-2 hover:text-primary transition-smooth w-full"
                >
                  <span>Value</span>
                  {getSortIcon('currentValue')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('profitLoss')}
                  className="flex items-center justify-end space-x-2 hover:text-primary transition-smooth w-full"
                >
                  <span>P&L</span>
                  {getSortIcon('profitLoss')}
                </button>
              </th>
              <th className="text-right p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('portfolioPercentage')}
                  className="flex items-center justify-end space-x-2 hover:text-primary transition-smooth w-full"
                >
                  <span>Weight</span>
                  {getSortIcon('portfolioPercentage')}
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings?.map((holding) => (
              <tr key={holding?.id} className="border-b hover:bg-muted/30 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={holding?.icon}
                      alt={`${holding?.name} icon`}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-foreground">{holding?.name}</p>
                      <p className="text-sm text-muted-foreground">{holding?.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <p className="font-medium text-foreground">{holding?.quantity}</p>
                  <p className="text-sm text-muted-foreground">{holding?.symbol}</p>
                </td>
                <td className="p-4 text-right">
                  <p className="font-medium text-foreground">${holding?.currentPrice?.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Avg: ${holding?.averagePrice?.toLocaleString()}</p>
                </td>
                <td className="p-4 text-right">
                  <p className="font-medium text-foreground">${holding?.currentValue?.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Cost: ${holding?.costBasis?.toLocaleString()}</p>
                </td>
                <td className="p-4 text-right">
                  <div className={`flex items-center justify-end space-x-1 ${
                    holding?.profitLoss >= 0 ? 'text-success' : 'text-error'
                  }`}>
                    <Icon 
                      name={holding?.profitLoss >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                    />
                    <div>
                      <p className="font-medium">${Math.abs(holding?.profitLoss)?.toLocaleString()}</p>
                      <p className="text-sm">({Math.abs(holding?.profitLossPercentage)?.toFixed(2)}%)</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <p className="font-medium text-foreground">{holding?.portfolioPercentage?.toFixed(2)}%</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCoinDetail(holding?.id)}
                      className="h-8 w-8"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleBuyMore(holding?.id)}
                      className="h-8 w-8 text-success hover:text-success"
                    >
                      <Icon name="Plus" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSell(holding?.id)}
                      className="h-8 w-8 text-error hover:text-error"
                    >
                      <Icon name="Minus" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;