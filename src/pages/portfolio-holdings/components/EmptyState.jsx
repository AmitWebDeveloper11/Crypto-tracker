import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    navigate('/add-transaction');
  };

  const handleExploreMarket = () => {
    navigate('/market-overview');
  };

  return (
    <div className="bg-card rounded-lg border shadow-elevation-1 p-8 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Icon name="PieChart" size={32} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">No Holdings Yet</h3>
          <p className="text-muted-foreground max-w-md">
            Start building your cryptocurrency portfolio by adding your first transaction or exploring the market.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button
            variant="default"
            onClick={handleAddTransaction}
            iconName="Plus"
            iconPosition="left"
          >
            Add First Transaction
          </Button>
          <Button
            variant="outline"
            onClick={handleExploreMarket}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Explore Market
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Getting Started Tips</h4>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>• Add transactions to track your investments</li>
            <li>• Monitor real-time portfolio performance</li>
            <li>• Set up price alerts for your holdings</li>
            <li>• Analyze profit/loss across all assets</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;