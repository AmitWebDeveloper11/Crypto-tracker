import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import CoinHeader from './components/CoinHeader';
import PriceChart from './components/PriceChart';
import MarketMetrics from './components/MarketMetrics';
import PortfolioSection from './components/PortfolioSection';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CoinDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const coinId = searchParams?.get('id') || 'bitcoin';
  
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [userHoldings, setUserHoldings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock coin data
  const mockCoinData = {
    bitcoin: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      currentPrice: 43250.00,
      marketCap: 847500000000,
      marketCapRank: 1,
      volume24h: 28500000000,
      priceChange24h: 2.5,
      priceChange1h: 0.8,
      priceChange7d: -1.2,
      priceChange30d: 15.6,
      marketCapChange24h: 1.8,
      volumeChange24h: -5.2,
      circulatingSupply: 19600000,
      totalSupply: 21000000,
      allTimeHigh: 69045.00,
      allTimeLow: 67.81,
      athDate: 'Nov 10, 2021',
      atlDate: 'Jul 05, 2013',
      athChange: -37.4,
      atlChange: 63650.2,
      marketDominance: 52.3,
      isWatchlisted: true
    },
    ethereum: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      currentPrice: 2680.00,
      marketCap: 322000000000,
      marketCapRank: 2,
      volume24h: 15200000000,
      priceChange24h: -1.2,
      priceChange1h: -0.3,
      priceChange7d: 3.8,
      priceChange30d: 8.9,
      marketCapChange24h: -0.8,
      volumeChange24h: 12.5,
      circulatingSupply: 120200000,
      totalSupply: null,
      allTimeHigh: 4878.26,
      allTimeLow: 0.43,
      athDate: 'Nov 16, 2021',
      atlDate: 'Oct 20, 2015',
      athChange: -45.1,
      atlChange: 623155.8,
      marketDominance: 19.8,
      isWatchlisted: false
    }
  };

  // Mock user holdings data
  const mockUserHoldings = {
    bitcoin: {
      amount: 1.25,
      totalInvested: 48000,
      averageCost: 38400,
      portfolioPercentage: 65.2,
      lastTransaction: 'Aug 20, 2025 - Buy 0.25 BTC'
    },
    ethereum: null // User doesn't own Ethereum
  };

  // Mock chart data
  const mockChartData = [
    { time: '00:00', price: 42800 },
    { time: '04:00', price: 43100 },
    { time: '08:00', price: 42950 },
    { time: '12:00', price: 43200 },
    { time: '16:00', price: 43450 },
    { time: '20:00', price: 43250 },
    { time: '24:00', price: 43250 }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const coinData = mockCoinData?.[coinId] || mockCoinData?.bitcoin;
      const holdings = mockUserHoldings?.[coinId];
      
      setCoin(coinData);
      setUserHoldings(holdings);
      setChartData(mockChartData);
      setIsLoading(false);
    }, 1000);
  }, [coinId]);

  const handleBuyMore = () => {
    navigate(`/add-transaction?type=buy&coin=${coin?.id}`);
  };

  const handleSell = () => {
    navigate(`/add-transaction?type=sell&coin=${coin?.id}`);
  };

  const handleAddToWatchlist = () => {
    setCoin(prev => ({
      ...prev,
      isWatchlisted: !prev?.isWatchlisted
    }));
    console.log(`${coin?.isWatchlisted ? 'Removed from' : 'Added to'} watchlist:`, coin?.name);
  };

  const handleSetAlert = (alertData) => {
    console.log('Price alert set:', alertData);
    // Here you would typically save the alert to your backend
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <BottomTabNavigation />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading coin details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <BottomTabNavigation />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">Coin Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The requested cryptocurrency could not be found.
            </p>
            <Button onClick={() => navigate('/market-overview')}>
              Browse Market
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-6">
      <HeaderNavigation />
      <BottomTabNavigation />
      {/* Breadcrumb Navigation */}
      <div className="bg-card border-b px-4 lg:px-6 py-3">
        <div className="flex items-center space-x-2 text-sm">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} />
            <span>Back</span>
          </button>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          <span className="text-foreground font-medium">Market</span>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          <span className="text-foreground font-medium">{coin?.name}</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Coin Header */}
        <CoinHeader coin={coin} />

        {/* Main Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Desktop Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2">
              <PriceChart coin={coin} chartData={chartData} />
            </div>

            {/* Right Column - Quick Actions */}
            <div className="lg:col-span-1">
              <QuickActions
                coin={coin}
                onBuyMore={handleBuyMore}
                onSell={handleSell}
                onAddToWatchlist={handleAddToWatchlist}
                onSetAlert={handleSetAlert}
              />
            </div>
          </div>

          {/* Market Metrics */}
          <MarketMetrics coin={coin} />

          {/* Portfolio Section */}
          <PortfolioSection
            coin={coin}
            userHoldings={userHoldings}
            onBuyMore={handleBuyMore}
            onSell={handleSell}
          />

          {/* Related Information */}
          <div className="bg-card border rounded-lg p-4 lg:p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">About {coin?.name}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4">
                {coin?.name} ({coin?.symbol}) is currently ranked #{coin?.marketCapRank} by market capitalization. 
                It has a circulating supply of {coin?.circulatingSupply?.toLocaleString()} {coin?.symbol} coins 
                {coin?.totalSupply && ` and a total supply of ${coin?.totalSupply?.toLocaleString()} ${coin?.symbol} coins`}.
              </p>
              <p>
                The current price of {coin?.name} is ${coin?.currentPrice?.toLocaleString()} with a 24-hour trading volume 
                of ${coin?.volume24h?.toLocaleString()}. The price has {coin?.priceChange24h >= 0 ? 'increased' : 'decreased'} by {Math.abs(coin?.priceChange24h)?.toFixed(2)}% 
                in the last 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
};

export default CoinDetail;