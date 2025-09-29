import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const FloatingActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getContextualActions = () => {
    switch (location?.pathname) {
      case '/dashboard':
        return [
          {
            label: 'Add Transaction',
            icon: 'Plus',
            action: () => navigate('/add-transaction'),
            primary: true
          },
          {
            label: 'Quick Buy',
            icon: 'ShoppingCart',
            action: () => console.log('Quick buy'),
            primary: false
          }
        ];
      case '/portfolio-holdings':
        return [
          {
            label: 'Add Transaction',
            icon: 'Plus',
            action: () => navigate('/add-transaction'),
            primary: true
          },
          {
            label: 'Export Portfolio',
            icon: 'Download',
            action: () => console.log('Export portfolio'),
            primary: false
          }
        ];
      case '/transaction-history':
        return [
          {
            label: 'Add Transaction',
            icon: 'Plus',
            action: () => navigate('/add-transaction'),
            primary: true
          },
          {
            label: 'Import CSV',
            icon: 'Upload',
            action: () => console.log('Import CSV'),
            primary: false
          }
        ];
      case '/market-overview':
        return [
          {
            label: 'Add to Watchlist',
            icon: 'Star',
            action: () => console.log('Add to watchlist'),
            primary: true
          },
          {
            label: 'Set Alert',
            icon: 'Bell',
            action: () => console.log('Set alert'),
            primary: false
          }
        ];
      case '/coin-detail':
        return [
          {
            label: 'Buy Now',
            icon: 'ShoppingCart',
            action: () => navigate('/add-transaction'),
            primary: true
          },
          {
            label: 'Add to Watchlist',
            icon: 'Star',
            action: () => console.log('Add to watchlist'),
            primary: false
          }
        ];
      default:
        return [
          {
            label: 'Add Transaction',
            icon: 'Plus',
            action: () => navigate('/add-transaction'),
            primary: true
          }
        ];
    }
  };

  const actions = getContextualActions();
  const primaryAction = actions?.find(action => action?.primary);
  const secondaryActions = actions?.filter(action => !action?.primary);

  const handlePrimaryAction = () => {
    if (secondaryActions?.length > 0) {
      setIsExpanded(!isExpanded);
    } else if (primaryAction) {
      primaryAction?.action();
    }
  };

  const handleSecondaryAction = (action) => {
    action?.action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
      {/* Secondary Actions */}
      {isExpanded && secondaryActions?.length > 0 && (
        <div className="mb-3 space-y-2">
          {secondaryActions?.map((action, index) => (
            <div
              key={index}
              className="flex items-center justify-end animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="mr-3 px-2 py-1 bg-card text-card-foreground text-sm rounded-lg shadow-elevation-1 whitespace-nowrap">
                {action?.label}
              </span>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => handleSecondaryAction(action)}
                className="h-12 w-12 rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200"
              >
                <Icon name={action?.icon} size={20} />
              </Button>
            </div>
          ))}
        </div>
      )}
      {/* Primary Action Button */}
      <div className="relative">
        <Button
          variant="default"
          size="icon"
          onClick={handlePrimaryAction}
          className={`h-14 w-14 rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 ${
            isExpanded ? 'rotate-45' : ''
          }`}
        >
          <Icon
            name={secondaryActions?.length > 0 ? 'Plus' : primaryAction?.icon || 'Plus'}
            size={24}
            strokeWidth={2.5}
          />
        </Button>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping" />
      </div>
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-transparent -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;