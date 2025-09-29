import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionStats = ({ transactions, filteredTransactions }) => {
  const calculateStats = () => {
    const totalTransactions = filteredTransactions?.length;
    const buyTransactions = filteredTransactions?.filter(t => t?.type === 'buy')?.length;
    const sellTransactions = filteredTransactions?.filter(t => t?.type === 'sell')?.length;
    const transferTransactions = filteredTransactions?.filter(t => t?.type === 'transfer')?.length;

    const totalValue = filteredTransactions?.reduce((sum, t) => sum + t?.totalValue, 0);
    const totalFees = filteredTransactions?.reduce((sum, t) => sum + (t?.fees || 0), 0);

    const buyValue = filteredTransactions?.filter(t => t?.type === 'buy')?.reduce((sum, t) => sum + t?.totalValue, 0);
    
    const sellValue = filteredTransactions?.filter(t => t?.type === 'sell')?.reduce((sum, t) => sum + t?.totalValue, 0);

    return {
      totalTransactions,
      buyTransactions,
      sellTransactions,
      transferTransactions,
      totalValue,
      totalFees,
      buyValue,
      sellValue,
      netValue: sellValue - buyValue
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Transactions',
      value: stats?.totalTransactions?.toLocaleString(),
      icon: 'Activity',
      color: 'text-primary'
    },
    {
      title: 'Buy Orders',
      value: stats?.buyTransactions?.toLocaleString(),
      icon: 'ArrowDownLeft',
      color: 'text-success'
    },
    {
      title: 'Sell Orders',
      value: stats?.sellTransactions?.toLocaleString(),
      icon: 'ArrowUpRight',
      color: 'text-error'
    },
    {
      title: 'Total Volume',
      value: `$${stats?.totalValue?.toLocaleString()}`,
      icon: 'DollarSign',
      color: 'text-primary'
    },
    {
      title: 'Total Fees',
      value: `$${stats?.totalFees?.toLocaleString()}`,
      icon: 'Receipt',
      color: 'text-warning'
    },
    {
      title: 'Net P&L',
      value: `${stats?.netValue >= 0 ? '+' : ''}$${stats?.netValue?.toLocaleString()}`,
      icon: stats?.netValue >= 0 ? 'TrendingUp' : 'TrendingDown',
      color: stats?.netValue >= 0 ? 'text-success' : 'text-error'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-muted ${stat?.color}`}>
              <Icon name={stat?.icon} size={16} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">
              {stat?.value}
            </p>
            <p className="text-xs text-muted-foreground">
              {stat?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionStats;