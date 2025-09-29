import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const HeaderNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Holdings', path: '/portfolio-holdings', icon: 'PieChart' },
    { label: 'Transactions', path: '/transaction-history', icon: 'ArrowLeftRight' },
    { label: 'Market', path: '/market-overview', icon: 'TrendingUp' },
  ];

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    console.log('Search query:', searchQuery);
    setIsSearchOpen(false);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-elevation-1">
        <div className="flex h-16 items-center px-4 lg:px-6">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="hidden font-semibold text-foreground sm:inline-block">
              CryptoTracker Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  location?.pathname === item?.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 w-9"
            >
              <Icon name="Search" size={18} />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Icon name="Bell" size={18} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUserMenuToggle}
                className="h-9 w-9"
              >
                <Icon name="User" size={18} />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-lg shadow-elevation-2 py-1 z-50">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium">Amit Pandey</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-sm hover:bg-muted transition-smooth"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 text-sm hover:bg-muted transition-smooth"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-3 py-2 text-sm text-error hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
            <div className="bg-card border rounded-lg shadow-elevation-3 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="h-8 w-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Icon
                    name="Search"
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Search cryptocurrencies, transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Search</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default HeaderNavigation;