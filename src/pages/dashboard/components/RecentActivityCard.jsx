import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivityCard = ({ recentTransactions }) => {
  const navigate = useNavigate();

  const handleViewAllTransactions = () => {
    navigate('/transaction-history');
  };

  const getTransactionIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'buy':
        return { name: 'ArrowDownLeft', color: 'text-success' };
      case 'sell':
        return { name: 'ArrowUpRight', color: 'text-error' };
      default:
        return { name: 'ArrowLeftRight', color: 'text-muted-foreground' };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevation-1 border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleViewAllTransactions}
          className="text-primary hover:text-primary/80"
        >
          View All
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </Button>
      </div>
      {recentTransactions?.length > 0 ? (
        <div className="space-y-4">
          {recentTransactions?.map((transaction) => {
            const iconConfig = getTransactionIcon(transaction?.type);
            
            return (
              <div 
                key={transaction?.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={transaction?.coinIcon}
                      alt={transaction?.coinName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-card rounded-full flex items-center justify-center border-2 border-card ${iconConfig?.color}`}>
                      <Icon name={iconConfig?.name} size={12} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-foreground capitalize">
                        {transaction?.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {transaction?.coinSymbol}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {transaction?.amount} {transaction?.coinSymbol} • {formatDate(transaction?.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">
                    ${transaction?.value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${transaction?.pricePerUnit?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per {transaction?.coinSymbol}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground mb-4">No recent transactions</p>
          <Button 
            variant="outline"
            onClick={() => navigate('/add-transaction')}
            iconName="Plus"
            iconPosition="left"
          >
            Add Your First Transaction
          </Button>
        </div>
      )}
      {recentTransactions?.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <Button 
            variant="outline" 
            fullWidth
            onClick={handleViewAllTransactions}
            iconName="History"
            iconPosition="left"
          >
            View Transaction History
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;