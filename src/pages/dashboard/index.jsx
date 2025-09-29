import React, { useState, useEffect } from 'react';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import PortfolioValueCard from './components/PortfolioValueCard';
import PortfolioChart from './components/PortfolioChart';
import TopHoldingsCard from './components/TopHoldingsCard';
import QuickActionsCard from './components/QuickActionsCard';
import MarketOverviewCard from './components/MarketOverviewCard';
import RecentActivityCard from './components/RecentActivityCard';

const Dashboard = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  // Mock portfolio data
  const mockPortfolioData = {
    totalValue: 127543.89,
    dailyChange: 3247.56,
    dailyChangePercent: 2.61
  };

  // Mock chart data
  const mockChartData = [
    { date: '08/19', value: 118500 },
    { date: '08/20', value: 121200 },
    { date: '08/21', value: 119800 },
    { date: '08/22', value: 123400 },
    { date: '08/23', value: 125600 },
    { date: '08/24', value: 124300 },
    { date: '08/25', value: 127544 }
  ];

  // Mock top holdings data
  const mockHoldings = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 1.25,
      value: 54062.50,
      change: 2.5,
      icon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 8.5,
      value: 22780.00,
      change: -1.2,
      icon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      amount: 15000,
      value: 7800.00,
      change: 5.8,
      icon: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      amount: 45.2,
      value: 6234.60,
      change: 3.4,
      icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&crop=center'
    }
  ];

  // Mock market data
  const mockMarketData = {
    topGainers: [
      {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'LINK',
        price: 14.52,
        change: 8.7,
        icon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center'
      },
      {
        id: 'polygon',
        name: 'Polygon',
        symbol: 'MATIC',
        price: 0.89,
        change: 6.3,
        icon: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center'
      }
    ],
    topLosers: [
      {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        price: 0.52,
        change: -4.2,
        icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100&h=100&fit=crop&crop=center'
      },
      {
        id: 'litecoin',
        name: 'Litecoin',
        symbol: 'LTC',
        price: 68.45,
        change: -2.8,
        icon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop&crop=center'
      }
    ]
  };

  // Mock recent transactions
  const mockRecentTransactions = [
    {
      id: '1',
      type: 'Buy',
      coinName: 'Bitcoin',
      coinSymbol: 'BTC',
      amount: 0.25,
      value: 10812.50,
      pricePerUnit: 43250.00,
      date: '2025-08-25',
      coinIcon: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '2',
      type: 'Sell',
      coinName: 'Ethereum',
      coinSymbol: 'ETH',
      amount: 2.0,
      value: 5360.00,
      pricePerUnit: 2680.00,
      date: '2025-08-24',
      coinIcon: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '3',
      type: 'Buy',
      coinName: 'Cardano',
      coinSymbol: 'ADA',
      amount: 5000,
      value: 2600.00,
      pricePerUnit: 0.52,
      date: '2025-08-23',
      coinIcon: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop&crop=center'
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPortfolioData(mockPortfolioData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderNavigation />
        <BottomTabNavigation />
        
        <main className="pb-20 md:pb-6">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your portfolio...</p>
              </div>
            </div>
          </div>
        </main>
        
        <FloatingActionButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      <BottomTabNavigation />
      <main className="pb-20 md:pb-6">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your crypto portfolio today.
            </p>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Portfolio Value Card */}
              <PortfolioValueCard
                totalValue={portfolioData?.totalValue}
                dailyChange={portfolioData?.dailyChange}
                dailyChangePercent={portfolioData?.dailyChangePercent}
              />

              {/* Portfolio Chart */}
              <PortfolioChart chartData={mockChartData} />

              {/* Top Holdings - Mobile/Tablet */}
              <div className="lg:hidden">
                <TopHoldingsCard holdings={mockHoldings} />
              </div>

              {/* Quick Actions - Mobile Only */}
              <div className="md:hidden">
                <QuickActionsCard />
              </div>

              {/* Recent Activity */}
              <RecentActivityCard recentTransactions={mockRecentTransactions} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Top Holdings - Desktop */}
              <div className="hidden lg:block">
                <TopHoldingsCard holdings={mockHoldings} />
              </div>

              {/* Quick Actions - Desktop/Tablet */}
              <div className="hidden md:block">
                <QuickActionsCard />
              </div>

              {/* Market Overview */}
              <MarketOverviewCard marketData={mockMarketData} />
            </div>
          </div>

          {/* Performance Summary - Full Width */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="text-2xl font-bold text-foreground">
                ${(portfolioData?.totalValue * 0.15)?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-muted-foreground">Total Invested</div>
            </div>
            
            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="text-2xl font-bold text-success">
                +${(portfolioData?.totalValue * 0.12)?.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-muted-foreground">Total Profit</div>
            </div>
            
            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="text-2xl font-bold text-foreground">4</div>
              <div className="text-sm text-muted-foreground">Assets Held</div>
            </div>
            
            <div className="bg-card rounded-lg p-4 text-center border">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Portfolio ROI</div>
            </div>
          </div>
        </div>
      </main>
      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;