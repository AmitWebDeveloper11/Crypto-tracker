import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import SearchOverlay from '../../components/ui/SearchOverlay';
import MarketStatsCard from './components/MarketStatsCard';
import TrendingCoinCard from './components/TrendingCoinCard';
import CryptocurrencyListItem from './components/CryptocurrencyListItem';
import MarketFilters from './components/MarketFilters';
import WatchlistPanel from './components/WatchlistPanel';

const MarketOverview = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    sortBy: 'market_cap',
    sortOrder: 'desc',
    category: 'all',
    priceRange: 'all',
    marketCapRange: 'all',
    changeFilter: 'all'
  });

  // Mock market statistics data
  const marketStats = [
    {
      title: 'Total Market Cap',
      value: '$1.68T',
      change: '+2.4%',
      changeType: 'positive',
      icon: 'DollarSign',
      description: '24h change'
    },
    {
      title: 'Total Volume',
      value: '$89.2B',
      change: '+12.8%',
      changeType: 'positive',
      icon: 'BarChart3',
      description: '24h volume'
    },
    {
      title: 'BTC Dominance',
      value: '51.2%',
      change: '-0.8%',
      changeType: 'negative',
      icon: 'PieChart',
      description: 'Market share'
    },
    {
      title: 'Active Coins',
      value: '2,847',
      change: null,
      changeType: null,
      icon: 'Coins',
      description: 'Tracked coins'
    }
  ];

  // Mock trending cryptocurrencies data
  const trendingCoins = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      currentPrice: 43250.00,
      priceChange24h: 2.5,
      isTrending: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      currentPrice: 2680.00,
      priceChange24h: -1.2,
      isTrending: true
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'sol',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      currentPrice: 98.45,
      priceChange24h: 8.7,
      isTrending: true
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      currentPrice: 0.52,
      priceChange24h: 5.8,
      isTrending: true
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'matic',
      image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
      currentPrice: 0.89,
      priceChange24h: -3.2,
      isTrending: true
    }
  ];

  // Mock top cryptocurrencies data
  const [cryptocurrencies, setCryptocurrencies] = useState([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      currentPrice: 43250.00,
      marketCap: 847500000000,
      volume24h: 28500000000,
      priceChange24h: 2.5,
      isWatchlisted: true,
      isTrending: true
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      currentPrice: 2680.00,
      marketCap: 322400000000,
      volume24h: 15200000000,
      priceChange24h: -1.2,
      isWatchlisted: false,
      isTrending: true
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'usdt',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      currentPrice: 1.00,
      marketCap: 95800000000,
      volume24h: 42100000000,
      priceChange24h: 0.02,
      isWatchlisted: false,
      isTrending: false
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'bnb',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      currentPrice: 315.80,
      marketCap: 47200000000,
      volume24h: 1800000000,
      priceChange24h: 1.8,
      isWatchlisted: true,
      isTrending: false
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'sol',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      currentPrice: 98.45,
      marketCap: 42800000000,
      volume24h: 3200000000,
      priceChange24h: 8.7,
      isWatchlisted: false,
      isTrending: true
    },
    {
      id: 'xrp',
      name: 'XRP',
      symbol: 'xrp',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      currentPrice: 0.58,
      marketCap: 31500000000,
      volume24h: 1100000000,
      priceChange24h: -2.4,
      isWatchlisted: false,
      isTrending: false
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ada',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      currentPrice: 0.52,
      marketCap: 18200000000,
      volume24h: 890000000,
      priceChange24h: 5.8,
      isWatchlisted: true,
      isTrending: true
    },
    {
      id: 'dogecoin',
      name: 'Dogecoin',
      symbol: 'doge',
      image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
      currentPrice: 0.082,
      marketCap: 11800000000,
      volume24h: 650000000,
      priceChange24h: -4.1,
      isWatchlisted: false,
      isTrending: false
    },
    {
      id: 'avalanche-2',
      name: 'Avalanche',
      symbol: 'avax',
      image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
      currentPrice: 36.75,
      marketCap: 13900000000,
      volume24h: 420000000,
      priceChange24h: 3.2,
      isWatchlisted: false,
      isTrending: false
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'matic',
      image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
      currentPrice: 0.89,
      marketCap: 8200000000,
      volume24h: 380000000,
      priceChange24h: -3.2,
      isWatchlisted: false,
      isTrending: true
    }
  ]);

  useEffect(() => {
    // Simulate initial data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false);
      console.log('Market data refreshed');
    }, 1000);
  };

  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
    console.log('Applied filters:', filters);
    // In a real app, this would filter the cryptocurrency list
  };

  const handleQuickBuy = (coinId) => {
    navigate(`/add-transaction?type=buy&coin=${coinId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <BottomTabNavigation />
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading market data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <HeaderNavigation />
      <BottomTabNavigation />
      {/* Main Content */}
      <main className="px-4 lg:px-6 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Market Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track cryptocurrency prices and market trends
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWatchlistOpen(true)}
              className="h-9 w-9 relative"
            >
              <Icon name="Star" size={18} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-warning text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-9 w-9"
            >
              <Icon 
                name="RefreshCw" 
                size={18} 
                className={refreshing ? 'animate-spin' : ''}
              />
            </Button>
          </div>
        </div>

        {/* Market Statistics */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Market Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {marketStats?.map((stat, index) => (
              <MarketStatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                change={stat?.change}
                changeType={stat?.changeType}
                icon={stat?.icon}
                description={stat?.description}
              />
            ))}
          </div>
        </section>

        {/* Trending Cryptocurrencies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Trending</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              iconName="Search"
              iconPosition="left"
            >
              Search
            </Button>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {trendingCoins?.map((coin) => (
              <TrendingCoinCard key={coin?.id} coin={coin} />
            ))}
          </div>
        </section>

        {/* Top Cryptocurrencies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Top Cryptocurrencies</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFiltersOpen(true)}
              iconName="Filter"
              iconPosition="left"
            >
              Filter
            </Button>
          </div>

          {/* Desktop Table Headers */}
          <div className="hidden md:flex items-center justify-between p-4 bg-muted/30 rounded-t-lg border-b text-sm font-medium text-muted-foreground">
            <div className="flex items-center space-x-3 flex-1">
              <span className="w-8">#</span>
              <span className="w-8"></span>
              <span>Name</span>
            </div>
            <div className="flex items-center space-x-6">
              <span className="w-24 text-right">Price</span>
              <span className="w-20 text-right">24h %</span>
              <span className="w-20 text-right">Market Cap</span>
              <span className="w-20 text-right">Volume</span>
              <span className="w-16 text-center">Chart</span>
              <span className="w-8"></span>
            </div>
          </div>

          {/* Cryptocurrency List */}
          <div className="bg-card border rounded-b-lg md:rounded-t-none overflow-hidden">
            {cryptocurrencies?.map((coin, index) => (
              <CryptocurrencyListItem
                key={coin?.id}
                coin={coin}
                index={index}
              />
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => console.log('Load more cryptocurrencies')}
              iconName="ChevronDown"
              iconPosition="right"
            >
              Load More
            </Button>
          </div>
        </section>
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton />
      {/* Overlays */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      <MarketFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
      <WatchlistPanel
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
      />
    </div>
  );
};

export default MarketOverview;