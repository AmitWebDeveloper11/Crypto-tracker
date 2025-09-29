import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Mock search data
  const mockData = {
    cryptocurrencies: [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: '$43,250.00', change: '+2.5%' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: '$2,680.00', change: '-1.2%' },
      { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: '$0.52', change: '+5.8%' },
    ],
    transactions: [
      { id: '1', type: 'Buy', coin: 'Bitcoin', amount: '0.5 BTC', date: '2025-08-25' },
      { id: '2', type: 'Sell', coin: 'Ethereum', amount: '2.0 ETH', date: '2025-08-24' },
    ],
    portfolio: [
      { id: '1', coin: 'Bitcoin', holdings: '1.25 BTC', value: '$54,062.50' },
      { id: '2', coin: 'Ethereum', holdings: '8.5 ETH', value: '$22,780.00' },
    ]
  };

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery?.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const query = searchQuery?.toLowerCase();
        const results = [];

        // Search cryptocurrencies
        const cryptoResults = mockData?.cryptocurrencies?.filter(
          crypto => 
            crypto?.name?.toLowerCase()?.includes(query) || 
            crypto?.symbol?.toLowerCase()?.includes(query)
        );
        if (cryptoResults?.length > 0) {
          results?.push({
            category: 'Cryptocurrencies',
            items: cryptoResults?.map(crypto => ({
              ...crypto,
              type: 'crypto'
            }))
          });
        }

        // Search transactions (context-aware)
        if (location?.pathname?.includes('transaction')) {
          const transactionResults = mockData?.transactions?.filter(
            tx => tx?.coin?.toLowerCase()?.includes(query) || tx?.type?.toLowerCase()?.includes(query)
          );
          if (transactionResults?.length > 0) {
            results?.push({
              category: 'Transactions',
              items: transactionResults?.map(tx => ({
                ...tx,
                type: 'transaction'
              }))
            });
          }
        }

        // Search portfolio (context-aware)
        if (location?.pathname?.includes('portfolio') || location?.pathname?.includes('dashboard')) {
          const portfolioResults = mockData?.portfolio?.filter(
            item => item?.coin?.toLowerCase()?.includes(query)
          );
          if (portfolioResults?.length > 0) {
            results?.push({
              category: 'Portfolio Holdings',
              items: portfolioResults?.map(item => ({
                ...item,
                type: 'portfolio'
              }))
            });
          }
        }

        setSearchResults(results);
        setIsLoading(false);
        setActiveIndex(-1);
      }, 300);
    } else {
      setSearchResults([]);
      setActiveIndex(-1);
    }
  }, [searchQuery, location?.pathname]);

  const handleKeyDown = (e) => {
    const totalItems = searchResults?.reduce((acc, category) => acc + category?.items?.length, 0);
    
    if (e?.key === 'ArrowDown') {
      e?.preventDefault();
      setActiveIndex(prev => (prev < totalItems - 1 ? prev + 1 : -1));
    } else if (e?.key === 'ArrowUp') {
      e?.preventDefault();
      setActiveIndex(prev => (prev > -1 ? prev - 1 : totalItems - 1));
    } else if (e?.key === 'Enter') {
      e?.preventDefault();
      if (activeIndex >= 0) {
        handleResultClick(getActiveItem());
      }
    } else if (e?.key === 'Escape') {
      onClose();
    }
  };

  const getActiveItem = () => {
    let currentIndex = 0;
    for (const category of searchResults) {
      for (const item of category?.items) {
        if (currentIndex === activeIndex) {
          return item;
        }
        currentIndex++;
      }
    }
    return null;
  };

  const handleResultClick = (item) => {
    switch (item?.type) {
      case 'crypto':
        navigate(`/coin-detail?id=${item?.id}`);
        break;
      case 'transaction': navigate('/transaction-history');
        break;
      case 'portfolio': navigate('/portfolio-holdings');
        break;
      default:
        break;
    }
    onClose();
  };

  const getResultIcon = (type) => {
    switch (type) {
      case 'crypto':
        return 'Coins';
      case 'transaction':
        return 'ArrowLeftRight';
      case 'portfolio':
        return 'PieChart';
      default:
        return 'Search';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-2xl mx-4">
        <div className="bg-card border rounded-lg shadow-elevation-3 animate-scale-in">
          {/* Search Input */}
          <div className="flex items-center border-b px-4 py-3">
            <Icon name="Search" size={20} className="text-muted-foreground mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search cryptocurrencies, transactions, portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 ml-2"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Searching...</span>
              </div>
            ) : searchResults?.length > 0 ? (
              <div className="py-2">
                {searchResults?.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-4 last:mb-0">
                    <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {category?.category}
                    </div>
                    {category?.items?.map((item, itemIndex) => {
                      const globalIndex = searchResults?.slice(0, categoryIndex)?.reduce((acc, cat) => acc + cat?.items?.length, 0) + itemIndex;
                      const isActive = globalIndex === activeIndex;
                      
                      return (
                        <button
                          key={item?.id}
                          onClick={() => handleResultClick(item)}
                          className={`w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-smooth ${
                            isActive ? 'bg-muted' : ''
                          }`}
                        >
                          <div className="flex-shrink-0 mr-3">
                            <Icon name={getResultIcon(item?.type)} size={18} className="text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item?.name || item?.coin}
                                {item?.symbol && (
                                  <span className="ml-2 text-muted-foreground">
                                    {item?.symbol}
                                  </span>
                                )}
                              </p>
                              {item?.price && (
                                <span className="text-sm font-mono text-foreground">
                                  {item?.price}
                                </span>
                              )}
                              {item?.value && (
                                <span className="text-sm font-mono text-foreground">
                                  {item?.value}
                                </span>
                              )}
                            </div>
                            {(item?.change || item?.holdings || item?.amount) && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {item?.change && (
                                  <span className={`${
                                    item?.change?.startsWith('+') ? 'text-success' : 'text-error'
                                  }`}>
                                    {item?.change}
                                  </span>
                                )}
                                {item?.holdings && `Holdings: ${item?.holdings}`}
                                {item?.amount && `${item?.type}: ${item?.amount}`}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : searchQuery?.trim() ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Icon name="Search" size={48} className="mb-2 opacity-50" />
                <p>No results found for "{searchQuery}"</p>
                <p className="text-xs mt-1">Try searching for cryptocurrencies, transactions, or portfolio items</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Icon name="Search" size={48} className="mb-2 opacity-50" />
                <p>Start typing to search</p>
                <div className="flex items-center space-x-4 mt-4 text-xs">
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">↑↓</kbd>
                    <span className="ml-1">Navigate</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
                    <span className="ml-1">Select</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
                    <span className="ml-1">Close</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;