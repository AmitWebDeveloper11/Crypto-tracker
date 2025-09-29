import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Add Transaction',
      description: 'Record a new buy or sell',
      icon: 'Plus',
      action: () => navigate('/add-transaction'),
      variant: 'default'
    },
    {
      title: 'View Holdings',
      description: 'See all your assets',
      icon: 'PieChart',
      action: () => navigate('/portfolio-holdings'),
      variant: 'outline'
    },
    {
      title: 'Transaction History',
      description: 'Review past trades',
      icon: 'History',
      action: () => navigate('/transaction-history'),
      variant: 'outline'
    },
    {
      title: 'Market Overview',
      description: 'Explore market trends',
      icon: 'TrendingUp',
      action: () => navigate('/market-overview'),
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-1 border">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Zap" size={20} className="text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            onClick={action?.action}
            className="h-auto p-4 flex-col items-start text-left space-y-2"
          >
            <div className="flex items-center space-x-2 w-full">
              <Icon name={action?.icon} size={18} />
              <span className="font-semibold">{action?.title}</span>
            </div>
            <span className="text-xs opacity-80 font-normal">
              {action?.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;