import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import SearchOverlay from '../../components/ui/SearchOverlay';
import TransactionCard from './components/TransactionCard';
import TransactionTable from './components/TransactionTable';
import FilterPanel from './components/FilterPanel';
import BulkActions from './components/BulkActions';
import TransactionStats from './components/TransactionStats';
import EmptyState from './components/EmptyState';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // Default to 'list' for mobile, will use a dynamic view on larger screens
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    type: '',
    cryptocurrency: '',
    amountRange: '',
    minAmount: '',
    maxAmount: '',
    notes: ''
  });

  // Mock transaction data
  const mockTransactions = [
    {
      id: '1',
      type: 'buy',
      cryptocurrency: 'Bitcoin',
      symbol: 'BTC',
      quantity: 0.5,
      price: 43250.00,
      totalValue: 21625.00,
      fees: 15.50,
      date: '2025-08-25T14:30:00Z',
      notes: 'DCA purchase - weekly investment'
    },
    {
      id: '2',
      type: 'sell',
      cryptocurrency: 'Ethereum',
      symbol: 'ETH',
      quantity: 2.0,
      price: 2680.00,
      totalValue: 5360.00,
      fees: 8.25,
      date: '2025-08-24T09:15:00Z',
      notes: 'Profit taking after 25% gain'
    },
    {
      id: '3',
      type: 'buy',
      cryptocurrency: 'Cardano',
      symbol: 'ADA',
      quantity: 1000,
      price: 0.52,
      totalValue: 520.00,
      fees: 2.50,
      date: '2025-08-23T16:45:00Z',
      notes: 'Accumulating for staking rewards'
    },
    {
      id: '4',
      type: 'transfer',
      cryptocurrency: 'Solana',
      symbol: 'SOL',
      quantity: 10,
      price: 85.50,
      totalValue: 855.00,
      fees: 0.25,
      date: '2025-08-22T11:20:00Z',
      notes: 'Transfer to hardware wallet'
    },
    {
      id: '5',
      type: 'buy',
      cryptocurrency: 'Polkadot',
      symbol: 'DOT',
      quantity: 50,
      price: 12.80,
      totalValue: 640.00,
      fees: 3.20,
      date: '2025-08-21T13:10:00Z',
      notes: 'Diversification purchase'
    },
    {
      id: '6',
      type: 'sell',
      cryptocurrency: 'Chainlink',
      symbol: 'LINK',
      quantity: 25,
      price: 18.40,
      totalValue: 460.00,
      fees: 2.30,
      date: '2025-08-20T10:30:00Z',
      notes: 'Rebalancing portfolio allocation'
    },
    {
      id: '7',
      type: 'buy',
      cryptocurrency: 'Bitcoin',
      symbol: 'BTC',
      quantity: 0.25,
      price: 42800.00,
      totalValue: 10700.00,
      fees: 7.75,
      date: '2025-08-19T15:45:00Z',
      notes: 'DCA purchase - weekly investment'
    },
    {
      id: '8',
      type: 'buy',
      cryptocurrency: 'Ethereum',
      symbol: 'ETH',
      quantity: 1.5,
      price: 2650.00,
      totalValue: 3975.00,
      fees: 6.50,
      date: '2025-08-18T12:20:00Z',
      notes: 'Accumulating before upgrade'
    }
  ];

  const [transactions] = useState(mockTransactions);

  // Filter and sort transactions (Logic remains the same, which is good)
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions?.filter(transaction => {
      // Date range filter
      if (filters?.fromDate && new Date(transaction.date) < new Date(filters.fromDate)) {
        return false;
      }
      if (filters?.toDate && new Date(transaction.date) > new Date(filters.toDate)) {
        return false;
      }

      // Type filter
      if (filters?.type && transaction?.type !== filters?.type) {
        return false;
      }

      // Cryptocurrency filter
      if (filters?.cryptocurrency && transaction?.cryptocurrency?.toLowerCase() !== filters?.cryptocurrency?.toLowerCase()) {
        return false;
      }

      // Amount range filter (Simplified logic for custom min/max from range preset)
      if (filters?.amountRange) {
        const [min, max] = filters?.amountRange?.split('-')?.map(v => v?.replace('+', ''));
        const minAmount = parseFloat(min) || 0;
        const maxAmount = max ? parseFloat(max) : Infinity;
        
        if (transaction?.totalValue < minAmount || transaction?.totalValue > maxAmount) {
          return false;
        }
      }

      // Custom amount filters
      if (filters?.minAmount && transaction?.totalValue < parseFloat(filters?.minAmount)) {
        return false;
      }
      if (filters?.maxAmount && transaction?.totalValue > parseFloat(filters?.maxAmount)) {
        return false;
      }

      // Notes filter
      if (filters?.notes && !transaction?.notes?.toLowerCase()?.includes(filters?.notes?.toLowerCase())) {
        return false;
      }

      return true;
    });

    // Sort transactions
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig?.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig?.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [transactions, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      type: '',
      cryptocurrency: '',
      amountRange: '',
      minAmount: '',
      maxAmount: '',
      notes: ''
    });
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false); // Close the mobile filter panel on apply
  };

  const handleSelectTransaction = (id, isSelected) => {
    setSelectedTransactions(prev => 
      isSelected 
        ? [...prev, id]
        : prev?.filter(transactionId => transactionId !== id)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedTransactions(
      isSelected ? filteredAndSortedTransactions?.map(t => t?.id) : []
    );
  };

  const handleClearSelection = () => {
    setSelectedTransactions([]);
  };

  const handleEditTransaction = (transaction) => {
    navigate(`/add-transaction?edit=${transaction?.id}`);
  };

  const handleDeleteTransaction = (id) => {
    console.log('Delete transaction:', id);
    // In a real app, this would make an API call
    // You'd also update the 'transactions' state here
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete transactions:', selectedTransactions);
    setSelectedTransactions([]);
    // In a real app, this would make an API call
  };

  const handleExport = async (format) => {
    console.log(`Exporting ${selectedTransactions?.length} transactions as ${format}`);
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000)); 
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  useEffect(() => {
    // Clear selection when filters change to prevent bulk actions on an outdated list
    setSelectedTransactions([]);
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* HeaderNavigation and BottomTabNavigation are assumed responsive */}
      <HeaderNavigation />
      <BottomTabNavigation />
      
      {/* Main Content Area */}
      <div className="pb-20 md:pb-6">
        <div className="flex">
          
          {/* Desktop Filter Sidebar (Hidden on mobile) */}
          <div className="hidden lg:block w-80 p-4 border-r sticky top-0 h-screen overflow-y-auto bg-card"> {/* Added sticky/h-screen for better desktop UX */}
            <h2 className="text-xl font-semibold mb-4 text-foreground">Filters</h2>
            <FilterPanel
              isOpen={true} // Always open on desktop
              onClose={() => {}} // No close button on sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onApplyFilters={() => {}} // No apply button needed for instant sidebar updates
            />
          </div>

          {/* Main Content Pane */}
          {/* Uses full width on mobile, shrinks when sidebar is active on desktop */}
          <div className="flex-1 p-4 lg:p-6 max-w-full lg:max-w-[calc(100%-20rem)] mx-auto"> 
            
            {/* Header and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
                <p className="text-sm text-muted-foreground">
                  Track and manage all your cryptocurrency transactions
                </p>
              </div>

              <div className="flex items-center space-x-2">
                
                {/* Refresh Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="h-10 w-10 flex-shrink-0"
                >
                  <Icon 
                    name="RefreshCw" 
                    size={18} 
                    className={isRefreshing ? 'animate-spin' : ''} 
                  />
                </Button>

                {/* Search Button (Visible on mobile/tablet) */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="h-10 w-10 flex-shrink-0 lg:hidden" // Use lg:hidden to show for mobile/md, hide when desktop sidebar is present
                >
                  <Icon name="Search" size={18} />
                </Button>

                {/* Filter Button (Visible on mobile/tablet) */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex-shrink-0"
                >
                  <Icon name="Filter" size={18} />
                  <span className="ml-2">Filter</span>
                  {hasActiveFilters && (
                    <div className="ml-2 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>

                {/* View Mode Toggle (Visible on tablet and larger) */}
                <div className="hidden md:flex border rounded-lg p-1 flex-shrink-0">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <Icon name="List" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                  >
                    <Icon name="Table" size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Transaction Stats */}
            <TransactionStats 
              transactions={transactions}
              filteredTransactions={filteredAndSortedTransactions}
            />

            {/* Transaction List/Table */}
            {filteredAndSortedTransactions?.length === 0 ? (
              <EmptyState 
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <>
                {/* Mobile List View (Always visible on mobile/tablet) */}
                <div className="md:hidden space-y-3 mt-6">
                  {filteredAndSortedTransactions?.map((transaction) => (
                    <TransactionCard
                      key={transaction?.id}
                      transaction={transaction}
                      onEdit={handleEditTransaction}
                      onDelete={handleDeleteTransaction}
                      isSelected={selectedTransactions?.includes(transaction?.id)}
                      onSelect={handleSelectTransaction}
                    />
                  ))}
                </div>

                {/* Desktop/Tablet View (Hidden on mobile) */}
                <div className="hidden md:block mt-6">
                  {viewMode === 'table' ? (
                    <TransactionTable
                      transactions={filteredAndSortedTransactions}
                      onEdit={handleEditTransaction}
                      onDelete={handleDeleteTransaction}
                      selectedTransactions={selectedTransactions}
                      onSelectTransaction={handleSelectTransaction}
                      onSelectAll={handleSelectAll}
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />
                  ) : (
                    // Desktop Card Grid View
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                      {filteredAndSortedTransactions?.map((transaction) => (
                        <TransactionCard
                          key={transaction?.id}
                          transaction={transaction}
                          onEdit={handleEditTransaction}
                          onDelete={handleDeleteTransaction}
                          isSelected={selectedTransactions?.includes(transaction?.id)}
                          onSelect={handleSelectTransaction}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Panel (As a slide-in drawer/modal, visible only on smaller screens) */}
      {/* It's positioned outside the main flow to act as an overlay */}
      <FilterPanel
        isOpen={isFilterOpen && !window.matchMedia('(min-width: 1024px)').matches} // Only open on mobile when explicitly set
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        onApplyFilters={handleApplyFilters}
      />
      
      {/* Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      
      {/* Bulk Actions (Fixed at the bottom when items are selected) */}
      <BulkActions
        selectedCount={selectedTransactions?.length}
        onExport={handleExport}
        onDelete={handleBulkDelete}
        onClearSelection={handleClearSelection}
      />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default TransactionHistory;