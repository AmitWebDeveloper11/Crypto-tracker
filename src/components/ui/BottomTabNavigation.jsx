import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();

  const tabItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      activeIcon: 'LayoutDashboard'
    },
    {
      label: 'Holdings',
      path: '/portfolio-holdings',
      icon: 'PieChart',
      activeIcon: 'PieChart'
    },
    {
      label: 'Transactions',
      path: '/transaction-history',
      icon: 'ArrowLeftRight',
      activeIcon: 'ArrowLeftRight'
    },
    {
      label: 'Market',
      path: '/market-overview',
      icon: 'TrendingUp',
      activeIcon: 'TrendingUp'
    }
  ];

  const isActive = (path) => {
    if (path === '/transaction-history') {
      return location?.pathname === '/transaction-history' || location?.pathname === '/add-transaction';
    }
    if (path === '/market-overview') {
      return location?.pathname === '/market-overview' || location?.pathname === '/coin-detail';
    }
    return location?.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-elevation-2 md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {tabItems?.map((item) => {
            const active = isActive(item?.path);
            return (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-2 transition-smooth ${
                  active
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`p-1 rounded-lg transition-smooth ${
                  active ? 'bg-primary/10' : ''
                }`}>
                  <Icon
                    name={active ? item?.activeIcon : item?.icon}
                    size={20}
                    strokeWidth={active ? 2.5 : 2}
                  />
                </div>
                <span className={`text-xs mt-1 font-medium truncate ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item?.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Desktop Top Navigation (below header) */}
      <nav className="hidden md:block bg-card border-b">
        <div className="flex items-center px-4 lg:px-6 h-12">
          <div className="flex space-x-1">
            {tabItems?.map((item) => {
              const active = isActive(item?.path);
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon
                    name={active ? item?.activeIcon : item?.icon}
                    size={16}
                    strokeWidth={active ? 2.5 : 2}
                  />
                  <span>{item?.label}</span>
                  {active && (
                    <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;