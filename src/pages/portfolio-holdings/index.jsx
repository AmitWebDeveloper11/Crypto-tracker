import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import SearchOverlay from '../../components/ui/SearchOverlay';
import PortfolioSummary from './components/PortfolioSummary';
import FilterChips from './components/FilterChips';
import HoldingCard from './components/HoldingCard';
import HoldingsTable from './components/HoldingsTable';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';

const PortfolioHoldings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'currentValue', direction: 'descending' });

  // Mock portfolio data
  const mockHoldings = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop&crop=center',
      quantity: 1.25,
      currentPrice: 43250.00,
      currentValue: 54062.50,
      costBasis: 48000.00,
      averagePrice: 38400.00,
      profitLoss: 6062.50,
      profitLossPercentage: 12.63,
      portfolioPercentage: 45.2
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center',
      quantity: 8.5,
      currentPrice: 2680.00,
      currentValue: 22780.00,
      costBasis: 25500.00,
      averagePrice: 3000.00,
      profitLoss: -2720.00,
      profitLossPercentage: -10.67,
      portfolioPercentage: 19.1
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      icon: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center',
      quantity: 15000,
      currentPrice: 0.52,
      currentValue: 7800.00,
      costBasis: 6750.00,
      averagePrice: 0.45,
      profitLoss: 1050.00,
      profitLossPercentage: 15.56,
      portfolioPercentage: 6.5
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&crop=center',
      quantity: 45,
      currentPrice: 98.50,
      currentValue: 4432.50,
      costBasis: 5400.00,
      averagePrice: 120.00,
      profitLoss: -967.50,
      profitLossPercentage: -17.92,
      portfolioPercentage: 3.7
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      icon: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center',
      quantity: 200,
      currentPrice: 14.25,
      currentValue: 2850.00,
      costBasis: 3200.00,
      averagePrice: 16.00,
      profitLoss: -350.00,
      profitLossPercentage: -10.94,
      portfolioPercentage: 2.4
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      icon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center',
      quantity: 1500,
      currentPrice: 0.85,
      currentValue: 1275.00,
      costBasis: 1350.00,
      averagePrice: 0.90,
      profitLoss: -75.00,
      profitLossPercentage: -5.56,
      portfolioPercentage: 1.1
    }
  ];

  // Calculate portfolio summary
  const portfolioSummary = useMemo(() => {
    const totalValue = mockHoldings?.reduce((sum, holding) => sum + holding?.currentValue, 0);
    const totalInvested = mockHoldings?.reduce((sum, holding) => sum + holding?.costBasis, 0);
    const totalReturn = totalValue - totalInvested;
    const returnPercentage = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    return {
      totalValue,
      totalInvested,
      totalReturn,
      returnPercentage
    };
  }, []);

  // Filter and sort holdings
  const filteredAndSortedHoldings = useMemo(() => {
    let filtered = mockHoldings?.filter(holding =>
      holding?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      holding?.symbol?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    // Apply filter
    switch (activeFilter) {
      case 'performance':
        filtered?.sort((a, b) => b?.profitLossPercentage - a?.profitLossPercentage);
        break;
      case 'alphabetical':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      case 'portfolio-percentage':
        filtered?.sort((a, b) => b?.portfolioPercentage - a?.portfolioPercentage);
        break;
      case 'value':
        filtered?.sort((a, b) => b?.currentValue - a?.currentValue);
        break;
      default:
        break;
    }

    // Apply sort config for table
    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        const aValue = a?.[sortConfig?.key];
        const bValue = b?.[sortConfig?.key];
        
        if (sortConfig?.direction === 'ascending') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [searchQuery, activeFilter, sortConfig]);

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, this would update prices from an API
      console.log('Updating prices...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio Holdings - CryptoTracker Pro</title>
        <meta name="description" content="Manage and track your cryptocurrency portfolio holdings with real-time performance analytics and comprehensive asset management tools." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <BottomTabNavigation />

        <main className="container mx-auto px-4 py-6 pb-20 md:pb-6">
          {/* Portfolio Summary */}
          <PortfolioSummary portfolioData={portfolioSummary} />

          {mockHoldings?.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Search and Filters */}
              <div className="mb-6">
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search holdings..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full"
                  />
                </div>
                <FilterChips 
                  activeFilter={activeFilter} 
                  onFilterChange={handleFilterChange} 
                />
              </div>

              {/* Holdings List - Mobile Cards */}
              <div className="md:hidden space-y-3">
                {filteredAndSortedHoldings?.length > 0 ? (
                  filteredAndSortedHoldings?.map((holding) => (
                    <HoldingCard key={holding?.id} holding={holding} />
                  ))
                ) : (
                  <div className="bg-card rounded-lg border p-8 text-center">
                    <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
                    <p className="text-muted-foreground">
                      No holdings match your search criteria. Try adjusting your filters or search terms.
                    </p>
                  </div>
                )}
              </div>

              {/* Holdings Table - Desktop */}
              <div className="hidden md:block">
                {filteredAndSortedHoldings?.length > 0 ? (
                  <HoldingsTable 
                    holdings={filteredAndSortedHoldings}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                  />
                ) : (
                  <div className="bg-card rounded-lg border p-8 text-center">
                    <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Results Found</h3>
                    <p className="text-muted-foreground">
                      No holdings match your search criteria. Try adjusting your filters or search terms.
                    </p>
                  </div>
                )}
              </div>

              {/* Performance Insights */}
              {filteredAndSortedHoldings?.length > 0 && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Best Performer</h4>
                      <Icon name="TrendingUp" size={16} className="text-success" />
                    </div>
                    {(() => {
                      const bestPerformer = filteredAndSortedHoldings?.reduce((best, current) => 
                        current?.profitLossPercentage > best?.profitLossPercentage ? current : best
                      );
                      return (
                        <div>
                          <p className="font-semibold text-foreground">{bestPerformer?.name}</p>
                          <p className="text-sm text-success">+{bestPerformer?.profitLossPercentage?.toFixed(2)}%</p>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Largest Holding</h4>
                      <Icon name="PieChart" size={16} className="text-primary" />
                    </div>
                    {(() => {
                      const largestHolding = filteredAndSortedHoldings?.reduce((largest, current) => 
                        current?.currentValue > largest?.currentValue ? current : largest
                      );
                      return (
                        <div>
                          <p className="font-semibold text-foreground">{largestHolding?.name}</p>
                          <p className="text-sm text-muted-foreground">${largestHolding?.currentValue?.toLocaleString()}</p>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Total Assets</h4>
                      <Icon name="Coins" size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{filteredAndSortedHoldings?.length}</p>
                      <p className="text-sm text-muted-foreground">Different cryptocurrencies</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        <FloatingActionButton />
        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </>
  );
};

export default PortfolioHoldings;