import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-muted/50 rounded-full p-6 mb-4">
          <Icon name="Search" size={48} className="text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No transactions found
        </h3>
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          No transactions match your current filters. Try adjusting your search criteria or clear all filters to see all transactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClearFilters}>
            <Icon name="X" size={16} className="mr-2" />
            Clear Filters
          </Button>
          <Button onClick={() => navigate('/add-transaction')}>
            <Icon name="Plus" size={16} className="mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-muted/50 rounded-full p-6 mb-4">
        <Icon name="ArrowLeftRight" size={48} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No transactions yet
      </h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Start tracking your cryptocurrency investments by adding your first transaction. You can record buys, sells, and transfers.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={() => navigate('/add-transaction')}>
          <Icon name="Plus" size={16} className="mr-2" />
          Add Your First Transaction
        </Button>
        <Button variant="outline" onClick={() => navigate('/market-overview')}>
          <Icon name="TrendingUp" size={16} className="mr-2" />
          Explore Market
        </Button>
      </div>
      
      <div className="mt-8 bg-card border rounded-lg p-6 max-w-md">
        <h4 className="font-semibold text-foreground mb-3">Getting Started</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
              1
            </div>
            <p className="text-sm text-muted-foreground">
              Add your first cryptocurrency transaction
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
              2
            </div>
            <p className="text-sm text-muted-foreground">
              Track your portfolio performance over time
            </p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
              3
            </div>
            <p className="text-sm text-muted-foreground">
              Export data for tax reporting and analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;